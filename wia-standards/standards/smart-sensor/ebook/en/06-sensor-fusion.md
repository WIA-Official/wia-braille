# Chapter 6: Sensor Fusion and Multi-Modal Sensing

## Combining Multiple Sensors for Superior Performance

Sensor fusion combines data from multiple sensors to achieve accuracy, reliability, and capabilities impossible with single sensors. This chapter explores algorithms, architectures, and implementation techniques for multi-sensor systems.

---

## Why Sensor Fusion?

### Limitations of Single Sensors

**Accelerometer alone:**
- Cannot distinguish tilt from acceleration
- Drifts during integration (velocity, position)
- Noisy at low frequencies

**Gyroscope alone:**
- Drifts over time (integration error)
- Cannot determine absolute orientation
- Sensitive to temperature

**Magnetometer alone:**
- Affected by magnetic interference
- Cannot detect vertical orientation
- Distorted near metal objects

**Together (IMU fusion):**
- Accurate 3D orientation
- Drift compensation
- Robust to individual sensor failures

### Benefits of Fusion

**Accuracy**: Combine complementary strengths
**Robustness**: Redundancy against sensor failures
**Completeness**: Capture multi-dimensional phenomena
**Context**: Understand complex situations
**Efficiency**: Extract maximum information from available sensors

---

## Sensor Fusion Algorithms

### 1. Complementary Filter

**Principle**: Combine high-frequency data from one sensor with low-frequency from another.

**Example: Accelerometer + Gyroscope Orientation**

```cpp
// Simple complementary filter
float alpha = 0.98;  // Gyro weight (high-pass)
float dt = 0.01;     // 100 Hz sampling

// Integrate gyroscope for short-term accuracy
angle_gyro += gyro_rate * dt;

// Use accelerometer for long-term stability
angle_accel = atan2(accel_y, accel_z);

// Fuse with complementary filter
angle = alpha * angle_gyro + (1 - alpha) * angle_accel;

// Update for next iteration
angle_gyro = angle;
```

**Characteristics:**
- Computationally cheap (2 multiplies, 1 add)
- Good for orientation estimation
- Alpha tuning: Higher = trust gyro more (responsive but drifty)
- Lower = trust accel more (stable but noisy)

**Typical alpha values:**
- 0.95-0.98: Good balance
- 0.90: More stable, less responsive
- 0.99: More responsive, slight drift

### 2. Kalman Filter

**Principle**: Optimal state estimation given system model and noise characteristics.

**State-Space Model:**
```
State prediction:    x̂(k|k-1) = A·x(k-1) + B·u(k)
Covariance predict:  P(k|k-1) = A·P(k-1)·Aᵀ + Q

Innovation:          y(k) = z(k) - H·x̂(k|k-1)
Kalman gain:         K(k) = P(k|k-1)·Hᵀ·[H·P(k|k-1)·Hᵀ + R]⁻¹

State update:        x̂(k|k) = x̂(k|k-1) + K(k)·y(k)
Covariance update:   P(k|k) = [I - K(k)·H]·P(k|k-1)
```

**Example: 1D Position Tracking (Accelerometer)**

```cpp
// State: [position, velocity]
// Measurement: acceleration

typedef struct {
    float x[2];      // State: [pos, vel]
    float P[2][2];   // Covariance matrix
    float Q[2][2];   // Process noise
    float R;         // Measurement noise
} KalmanFilter;

void kalman_predict(KalmanFilter* kf, float dt) {
    // State transition matrix A
    float A[2][2] = {{1, dt}, {0, 1}};

    // Predict state: x = A·x
    float x_new[2];
    x_new[0] = A[0][0]*kf->x[0] + A[0][1]*kf->x[1];
    x_new[1] = A[1][0]*kf->x[0] + A[1][1]*kf->x[1];
    kf->x[0] = x_new[0];
    kf->x[1] = x_new[1];

    // Predict covariance: P = A·P·Aᵀ + Q
    // (Matrix math simplified for brevity)
}

void kalman_update(KalmanFilter* kf, float accel) {
    // Measurement matrix H (accel relates to velocity derivative)
    float H[2] = {0, 1};

    // Innovation: y = z - H·x
    float y = accel - kf->x[1];

    // Kalman gain: K = P·Hᵀ / (H·P·Hᵀ + R)
    float S = kf->P[1][1] + kf->R;
    float K[2] = {kf->P[0][1]/S, kf->P[1][1]/S};

    // Update state: x = x + K·y
    kf->x[0] += K[0] * y;
    kf->x[1] += K[1] * y;

    // Update covariance: P = (I - K·H)·P
    // (Simplified for brevity)
}
```

**Computational Cost:**
- 1D Kalman: ~50 operations
- 6D Kalman (full IMU): ~500 operations
- Extended Kalman Filter (nonlinear): ~1000+ operations

**Memory:**
- State vector: N floats
- Covariance matrix: N×N floats
- Temp matrices: ~N² floats

**For 6-state filter:**
- Memory: ~200 bytes
- Computation: ~2 ms on Cortex-M4 @ 80 MHz

### 3. Extended Kalman Filter (EKF)

**For nonlinear systems** (most real-world sensor fusion).

**Example: 9-DOF IMU Fusion (Accel + Gyro + Mag)**

```cpp
// State: Quaternion orientation [q0, q1, q2, q3]
// Inputs: Gyroscope [wx, wy, wz]
// Measurements: Accelerometer [ax, ay, az], Magnetometer [mx, my, mz]

typedef struct {
    float q[4];      // Quaternion
    float P[4][4];   // Covariance
    float Q[4][4];   // Process noise
    float R_accel[3][3];  // Accel measurement noise
    float R_mag[3][3];    // Mag measurement noise
} EKF_IMU;

void ekf_predict(EKF_IMU* ekf, float wx, float wy, float wz, float dt) {
    // Nonlinear state transition: quaternion integration
    float q_dot[4];
    q_dot[0] = 0.5 * (-ekf->q[1]*wx - ekf->q[2]*wy - ekf->q[3]*wz);
    q_dot[1] = 0.5 * ( ekf->q[0]*wx - ekf->q[3]*wy + ekf->q[2]*wz);
    q_dot[2] = 0.5 * ( ekf->q[3]*wx + ekf->q[0]*wy - ekf->q[1]*wz);
    q_dot[3] = 0.5 * (-ekf->q[2]*wx + ekf->q[1]*wy + ekf->q[0]*wz);

    // Euler integration
    for (int i = 0; i < 4; i++) {
        ekf->q[i] += q_dot[i] * dt;
    }

    // Normalize quaternion
    normalize_quat(ekf->q);

    // Linearized state transition (Jacobian)
    float F[4][4];
    compute_jacobian_F(F, wx, wy, wz, dt);

    // Covariance prediction: P = F·P·Fᵀ + Q
    // (Matrix operations)
}

void ekf_update_accel(EKF_IMU* ekf, float ax, float ay, float az) {
    // Expected measurement (gravity in body frame)
    float h[3];
    quat_rotate_vector(ekf->q, (float[]){0, 0, -1}, h);

    // Innovation: y = z - h(x)
    float y[3] = {ax - h[0], ay - h[1], az - h[2]};

    // Measurement Jacobian H
    float H[3][4];
    compute_jacobian_H_accel(H, ekf->q);

    // Standard Kalman update with linearized H
    // ... (Kalman gain, state update, covariance update)
}

void ekf_update_mag(EKF_IMU* ekf, float mx, float my, float mz) {
    // Similar to accel update, but for magnetic field
    // ...
}
```

**Performance:**
- Computation: 5-10 ms per update on Cortex-M4
- Memory: ~300 bytes
- Accuracy: < 2° RMS orientation error

**Optimized Libraries:**
- Madgwick filter (lighter alternative)
- Mahony filter (even lighter)
- Proprietary filters from sensor vendors (Bosch, ST)

### 4. Particle Filter

**For non-Gaussian, multi-modal distributions.**

**Concept:** Represent state distribution with particles (samples).

**Algorithm:**
```
1. Initialize N particles randomly
2. Predict: Move each particle according to motion model
3. Update: Weight particles by measurement likelihood
4. Resample: Keep particles with high weights, discard low
5. Estimate: Weighted average of particles
```

**Example: Indoor Localization (WiFi + IMU)**

```cpp
#define NUM_PARTICLES 100

typedef struct {
    float x, y;      // Position
    float theta;     // Heading
    float weight;    // Particle weight
} Particle;

Particle particles[NUM_PARTICLES];

void particle_predict(float v, float omega, float dt) {
    for (int i = 0; i < NUM_PARTICLES; i++) {
        // Motion model (with noise)
        particles[i].x += (v + randn()*0.1) * cos(particles[i].theta) * dt;
        particles[i].y += (v + randn()*0.1) * sin(particles[i].theta) * dt;
        particles[i].theta += (omega + randn()*0.05) * dt;
    }
}

void particle_update_wifi(float* rssi, int num_aps) {
    for (int i = 0; i < NUM_PARTICLES; i++) {
        // Compute expected RSSI at particle location
        float expected_rssi[num_aps];
        wifi_propagation_model(particles[i].x, particles[i].y, expected_rssi);

        // Likelihood: Gaussian probability of measurement
        float likelihood = 1.0;
        for (int j = 0; j < num_aps; j++) {
            float error = rssi[j] - expected_rssi[j];
            likelihood *= exp(-error*error / (2*sigma*sigma));
        }

        particles[i].weight *= likelihood;
    }

    // Normalize weights
    float sum = 0;
    for (int i = 0; i < NUM_PARTICLES; i++) sum += particles[i].weight;
    for (int i = 0; i < NUM_PARTICLES; i++) particles[i].weight /= sum;
}

void particle_resample() {
    Particle new_particles[NUM_PARTICLES];

    for (int i = 0; i < NUM_PARTICLES; i++) {
        // Sample particle with probability proportional to weight
        float r = rand_uniform();
        float cumsum = 0;
        for (int j = 0; j < NUM_PARTICLES; j++) {
            cumsum += particles[j].weight;
            if (r < cumsum) {
                new_particles[i] = particles[j];
                new_particles[i].weight = 1.0 / NUM_PARTICLES;
                break;
            }
        }
    }

    memcpy(particles, new_particles, sizeof(particles));
}

void get_position_estimate(float* x, float* y) {
    *x = 0; *y = 0;
    for (int i = 0; i < NUM_PARTICLES; i++) {
        *x += particles[i].x * particles[i].weight;
        *y += particles[i].y * particles[i].weight;
    }
}
```

**Computational Cost:**
- 100 particles: ~10 ms per update (Cortex-M4)
- Scales linearly with particle count

**When to use:**
- Non-Gaussian noise
- Multi-modal distributions (e.g., ambiguous position)
- Nonlinear, complex models

---

## Multi-Modal Sensing Architectures

### Audio + Motion Fusion

**Application:** Context-aware voice assistant

**Sensors:**
- MEMS microphone array (4 mics)
- 6-axis IMU

**Fusion Strategy:**

```cpp
enum Context {
    STATIONARY,
    WALKING,
    RUNNING,
    IN_VEHICLE,
    CYCLING
};

Context detect_context(float accel[3], float gyro[3]) {
    // ML classifier on IMU data
    return ml_classify_activity(accel, gyro);
}

void adaptive_audio_processing(float* audio, Context ctx) {
    switch (ctx) {
        case STATIONARY:
            // Gentle noise reduction
            denoise(audio, NOISE_LEVEL_LOW);
            break;

        case WALKING:
            // Footstep noise cancellation
            adaptive_filter(audio, FOOTSTEP_FREQ);
            denoise(audio, NOISE_LEVEL_MEDIUM);
            break;

        case IN_VEHICLE:
            // Aggressive noise reduction (road noise)
            denoise(audio, NOISE_LEVEL_HIGH);
            beamforming(audio, DIRECTION_FRONT);
            break;

        case RUNNING:
            // Maximum noise reduction
            denoise(audio, NOISE_LEVEL_MAX);
            break;
    }
}
```

**Benefit:** 30% improvement in voice recognition accuracy in noisy environments.

### Vision + Depth Fusion

**Application:** Gesture recognition for smart displays

**Sensors:**
- Camera (RGB, 640×480)
- Time-of-Flight sensor (64-zone depth)

**Fusion:**

```cpp
typedef struct {
    float x, y, z;  // 3D position
} Hand3D;

Hand3D detect_hand_3d(uint8_t* rgb_image, float* depth_map) {
    // 1. Detect hand in RGB image
    BoundingBox hand_2d = detect_hand_rgb(rgb_image);

    // 2. Get depth at hand location
    float hand_depth = get_depth_at(depth_map, hand_2d.center_x, hand_2d.center_y);

    // 3. Convert 2D + depth to 3D
    Hand3D hand_3d;
    pixel_to_3d(hand_2d.center_x, hand_2d.center_y, hand_depth, &hand_3d);

    return hand_3d;
}

Gesture classify_gesture_3d(Hand3D* trajectory, int num_frames) {
    // Analyze 3D trajectory
    // Much more robust than 2D analysis
    return ml_classify_3d_gesture(trajectory, num_frames);
}
```

**Accuracy:**
- 2D only: 78%
- 3D (RGB + depth): 94%

### Environmental Sensor Fusion

**Application:** Indoor air quality monitoring

**Sensors:**
- Temperature (±0.1°C)
- Humidity (±2%)
- Pressure (±1 hPa)
- CO₂ (±50 ppm)
- VOC (volatile organic compounds)
- PM2.5 (particulate matter)

**Fusion for Air Quality Index:**

```cpp
typedef struct {
    float temp_c;
    float humidity_pct;
    float pressure_hpa;
    float co2_ppm;
    float voc_index;
    float pm25_ugm3;
} EnvironmentalData;

int compute_aqi(EnvironmentalData* env) {
    // Individual sub-indices
    int aqi_temp = (env->temp_c < 18 || env->temp_c > 26) ? 50 : 100;
    int aqi_humidity = (env->humidity_pct < 30 || env->humidity_pct > 60) ? 60 : 100;
    int aqi_co2 = map(env->co2_ppm, 400, 2000, 100, 0);  // 400=perfect, 2000=poor
    int aqi_voc = 100 - env->voc_index;
    int aqi_pm25 = map(env->pm25_ugm3, 0, 50, 100, 0);

    // Weighted average (weights based on health impact)
    int aqi = (aqi_temp * 10 +
               aqi_humidity * 10 +
               aqi_co2 * 30 +
               aqi_voc * 25 +
               aqi_pm25 * 25) / 100;

    return aqi;
}

const char* aqi_to_rating(int aqi) {
    if (aqi >= 90) return "Excellent";
    if (aqi >= 70) return "Good";
    if (aqi >= 50) return "Moderate";
    if (aqi >= 30) return "Poor";
    return "Unhealthy";
}
```

---

## Sensor Calibration and Compensation

### Temperature Compensation

Many sensors drift with temperature. Compensation improves accuracy.

**Example: Magnetometer Temperature Compensation**

```cpp
// Calibration: Measure offset at different temperatures
typedef struct {
    float temp_c;
    float offset[3];  // X, Y, Z offsets
} MagCalibPoint;

MagCalibPoint calib_table[10];  // 10 temperature points

void compensate_magnetometer(float temp_c, float mag[3]) {
    // Interpolate offset from calibration table
    float offset[3];
    interpolate_offset(calib_table, 10, temp_c, offset);

    // Apply compensation
    mag[0] -= offset[0];
    mag[1] -= offset[1];
    mag[2] -= offset[2];
}
```

**Accuracy improvement:**
- Uncompensated: ±5° heading error (over -20°C to +60°C)
- Compensated: ±1° heading error

### Cross-Axis Alignment

Sensors mounted on PCB have misalignment. Calibration corrects this.

**Rotation Matrix Calibration:**

```cpp
// Calibration procedure:
// 1. Measure sensor in 6 orientations (+X, -X, +Y, -Y, +Z, -Z)
// 2. Compute rotation matrix that aligns sensor axes to platform axes

float R[3][3];  // Rotation matrix (from calibration)

void align_sensor(float sensor_raw[3], float sensor_aligned[3]) {
    // Apply rotation matrix
    sensor_aligned[0] = R[0][0]*sensor_raw[0] + R[0][1]*sensor_raw[1] + R[0][2]*sensor_raw[2];
    sensor_aligned[1] = R[1][0]*sensor_raw[0] + R[1][1]*sensor_raw[1] + R[1][2]*sensor_raw[2];
    sensor_aligned[2] = R[2][0]*sensor_raw[0] + R[2][1]*sensor_raw[1] + R[2][2]*sensor_raw[2];
}
```

### Time Synchronization

Multi-sensor fusion requires synchronized timestamps.

**Hardware Timestamp:**

```cpp
// Use MCU timer to timestamp sensor samples
uint32_t timestamp_us;

void EXTI_IRQHandler() {
    // Sensor data ready interrupt
    timestamp_us = TIM2->CNT;  // Hardware timestamp
    read_sensor(sensor_data);
    sensor_data.timestamp = timestamp_us;
    queue_push(sensor_queue, &sensor_data);
}
```

**Software Timestamp (less accurate):**

```cpp
void sensor_task() {
    uint32_t timestamp = millis();
    read_sensors();
    sensor_data.timestamp = timestamp;
}
```

**Time Alignment:**

```cpp
typedef struct {
    uint32_t timestamp;
    float data[3];
} SensorSample;

void align_samples(SensorSample* s1, SensorSample* s2) {
    // Interpolate s2 to match s1 timestamp
    if (s2->timestamp > s1->timestamp) {
        // s2 is newer, need previous s2 sample
        SensorSample s2_prev = get_previous_sample(s2);
        float alpha = (s1->timestamp - s2_prev.timestamp) /
                     (s2->timestamp - s2_prev.timestamp);

        for (int i = 0; i < 3; i++) {
            s2->data[i] = lerp(s2_prev.data[i], s2->data[i], alpha);
        }
    }
}
```

---

## Advanced Fusion Techniques

### Sensor Redundancy and Voting

**Triple Modular Redundancy (TMR):**

```cpp
float get_robust_temperature() {
    float t1 = read_sensor_1();
    float t2 = read_sensor_2();
    float t3 = read_sensor_3();

    // Median voting (robust to single sensor failure)
    return median(t1, t2, t3);
}
```

**Benefits:**
- Fault tolerance (survives 1 sensor failure)
- Outlier rejection
- Higher reliability

**Cost:** 3× sensors, 3× power

### Adaptive Weighting

**Dynamically adjust sensor weights based on quality metrics:**

```cpp
float fuse_orientation_adaptive(float angle_gyro, float angle_accel,
                                float gyro_noise, float accel_noise) {
    // Higher noise = lower weight
    float w_gyro = 1.0 / (gyro_noise + 1e-6);
    float w_accel = 1.0 / (accel_noise + 1e-6);

    // Normalize weights
    float total = w_gyro + w_accel;
    w_gyro /= total;
    w_accel /= total;

    return w_gyro * angle_gyro + w_accel * angle_accel;
}
```

**Benefit:** Automatic adaptation to varying conditions.

---

**Next Chapter**: Communication protocols and IoT integration for smart sensors.

---

© 2025 SmileStory Inc. / WIA
弘익人間 (Hongik Ingan) · Benefit All Humanity
