#!/usr/bin/env python3
"""
Batch update quantum ebook chapters with color fix and enhanced content
"""

import os
import re

# Define chapter-specific content enhancements
CHAPTER_ENHANCEMENTS = {
    3: {  # Grover's Algorithm
        "title": "Grover's Search Algorithm",
        "subtitle": "Quadratic speedup for unstructured database search through amplitude amplification",
        "extra_content": """
        <h2>Amplitude Amplification</h2>
        <p>
            Grover's algorithm uses amplitude amplification to boost the probability of measuring the correct answer. Starting from a uniform superposition, the algorithm repeatedly applies the Grover operator G = (2|ψ⟩⟨ψ| - I) · O, where O is the oracle marking target states. Each iteration rotates the state vector closer to the target state by approximately θ = arcsin(√(M/N)).
        </p>

        <table>
            <thead>
                <tr><th>Database Size (N)</th><th>Classical Queries</th><th>Quantum Iterations</th><th>Speedup</th></tr>
            </thead>
            <tbody>
                <tr><td>1,000</td><td>500 (average)</td><td>~25</td><td>20x</td></tr>
                <tr><td>1,000,000</td><td>500,000</td><td>~785</td><td>637x</td></tr>
                <tr><td>1,000,000,000</td><td>500,000,000</td><td>~24,855</td><td>20,117x</td></tr>
            </tbody>
        </table>

        <h3>Oracle Construction</h3>
        <p>
            The oracle O marks target states by flipping their phase: O|x⟩ = (-1)^f(x)|x⟩ where f(x) = 1 for target items. This is typically implemented using phase kickback with an ancilla qubit in the |−⟩ = (|0⟩ - |1⟩)/√2 state. The specifics of oracle construction depend on the problem structure and available quantum gates.
        </p>

        <h2>Review Questions</h2>
        <div class="info-box">
            <ol>
                <li><strong>How many iterations does Grover's algorithm require for N items?</strong><br>
                Derive the optimal number of iterations π/4 × √N and explain the geometric interpretation.</li>
                <li><strong>What is the success probability after k Grover iterations?</strong><br>
                Express the probability as sin²((2k+1)θ) and discuss how it approaches 1.</li>
                <li><strong>How does the diffusion operator work in Grover's algorithm?</strong><br>
                Explain the inversion about average operation 2|ψ⟩⟨ψ| - I and its circuit implementation.</li>
                <li><strong>Can Grover's algorithm be used for multiple marked items?</strong><br>
                Discuss how the number of iterations changes with M marked items out of N total.</li>
                <li><strong>What are the limitations of Grover's speedup?</strong><br>
                Explain why the speedup is quadratic rather than exponential and the oracle query requirements.</li>
                <li><strong>How is Grover's algorithm implemented on real quantum hardware?</strong><br>
                Describe gate requirements and sources of error in NISQ implementations.</li>
                <li><strong>What applications benefit most from Grover's search?</strong><br>
                Identify use cases in optimization, cryptanalysis, and database search.</li>
            </ol>
        </div>
"""
    },
    4: {  # VQE
        "title": "Variational Quantum Eigensolver (VQE)",
        "subtitle": "Hybrid quantum-classical algorithm for finding ground state energies of molecular systems",
        "extra_content": """
        <h2>Hybrid Quantum-Classical Approach</h2>
        <p>
            VQE combines quantum state preparation with classical optimization to find the minimum eigenvalue of a Hamiltonian H. The quantum computer prepares parameterized states |ψ(θ)⟩ and measures energy ⟨H⟩, while a classical optimizer updates parameters θ to minimize the energy. This hybrid approach is well-suited for NISQ devices as it tolerates moderate levels of noise.
        </p>

        <table>
            <thead>
                <tr><th>Component</th><th>Type</th><th>Function</th><th>Complexity</th></tr>
            </thead>
            <tbody>
                <tr><td>Ansatz Preparation</td><td>Quantum</td><td>Create |ψ(θ)⟩</td><td>O(gates)</td></tr>
                <tr><td>Energy Measurement</td><td>Quantum</td><td>Measure ⟨H⟩</td><td>O(terms)</td></tr>
                <tr><td>Parameter Update</td><td>Classical</td><td>Optimize θ</td><td>O(iterations)</td></tr>
            </tbody>
        </table>

        <h3>Ansatz Design Strategies</h3>
        <p>
            Hardware-efficient ansätze use native gates available on the quantum processor, arranged in layers of single-qubit rotations and entangling gates. Chemistry-inspired ansätze like UCCSD (Unitary Coupled Cluster Singles and Doubles) encode physical symmetries and excitation structures, providing better convergence for molecular problems but requiring more gates.
        </p>

        <table>
            <thead>
                <tr><th>Ansatz Type</th><th>Advantages</th><th>Disadvantages</th><th>Best For</th></tr>
            </thead>
            <tbody>
                <tr><td>Hardware-efficient</td><td>Shallow circuits, fast</td><td>May miss structure</td><td>NISQ devices</td></tr>
                <tr><td>UCCSD</td><td>Chemical accuracy</td><td>Deep circuits</td><td>Small molecules</td></tr>
                <tr><td>Adaptive</td><td>Problem-tailored</td><td>Complex preparation</td><td>Research applications</td></tr>
            </tbody>
        </table>

        <h2>Review Questions</h2>
        <div class="info-box">
            <ol>
                <li><strong>Why is VQE called a variational algorithm?</strong><br>
                Explain the variational principle and how it guarantees E(θ) ≥ E₀.</li>
                <li><strong>How is the Hamiltonian measured in VQE?</strong><br>
                Describe the decomposition into Pauli terms and separate measurement of each term.</li>
                <li><strong>What classical optimizers work best with VQE?</strong><br>
                Compare gradient-based (BFGS), gradient-free (COBYLA), and stochastic (SPSA) methods.</li>
                <li><strong>How does ansatz depth affect VQE performance?</strong><br>
                Discuss the tradeoff between expressibility and circuit noise on NISQ devices.</li>
                <li><strong>What molecular properties can VQE calculate?</strong><br>
                Explain ground state energy, excited states, and reaction pathways.</li>
                <li><strong>How does VQE handle noise in quantum circuits?</strong><br>
                Describe error mitigation techniques and their effectiveness.</li>
                <li><strong>What are the scalability challenges for VQE?</strong><br>
                Discuss qubit requirements, circuit depth, and number of measurements needed.</li>
            </ol>
        </div>
"""
    },
    5: {  # QAOA
        "title": "Quantum Approximate Optimization Algorithm (QAOA)",
        "subtitle": "Variational algorithm for combinatorial optimization problems on near-term quantum devices",
        "extra_content": """
        <h2>Combinatorial Optimization</h2>
        <p>
            QAOA addresses NP-hard combinatorial optimization problems by encoding them as Hamiltonians and using alternating layers of problem and mixer operators. For MaxCut on a graph G=(V,E), the cost Hamiltonian HC = Σ(i,j)∈E (1 - ZᵢZⱼ)/2 counts edges cut by a partition. The algorithm guarantees approximation ratios that improve with circuit depth p.
        </p>

        <table>
            <thead>
                <tr><th>Problem Type</th><th>Encoding</th><th>QAOA Depth p=1</th><th>Classical Best</th></tr>
            </thead>
            <tbody>
                <tr><td>MaxCut</td><td>Σ (1-ZᵢZⱼ)/2</td><td>0.6924-approximation</td><td>0.878 (Goemans-Williamson)</td></tr>
                <tr><td>3-SAT</td><td>Clause satisfaction</td><td>Problem-dependent</td><td>Varies</td></tr>
                <tr><td>Graph Coloring</td><td>Constraint violation</td><td>Heuristic</td><td>Heuristic</td></tr>
            </tbody>
        </table>

        <h3>Parameter Optimization Landscape</h3>
        <p>
            The QAOA cost function F(β,γ) exhibits a complex landscape with multiple local minima. Classical optimizers must navigate this landscape efficiently. Gradient-based methods can use parameter-shift rules to estimate gradients on quantum hardware. Recent research shows that concentration phenomena may limit QAOA performance on random instances at large scale.
        </p>

        <h2>Review Questions</h2>
        <div class="info-box">
            <ol>
                <li><strong>How does QAOA differ from VQE?</strong><br>
                Compare their objectives, circuit structures, and problem domains.</li>
                <li><strong>What is the role of the mixer Hamiltonian in QAOA?</strong><br>
                Explain how HB = ΣᵢXᵢ enables transitions between computational basis states.</li>
                <li><strong>How does circuit depth p affect approximation quality?</strong><br>
                Discuss the tradeoff between approximation ratio and gate depth on NISQ devices.</li>
                <li><strong>Can QAOA outperform classical algorithms?</strong><br>
                Examine current evidence for quantum advantage in optimization problems.</li>
                <li><strong>How are constraints encoded in QAOA?</strong><br>
                Describe penalty terms and alternative mixer strategies for constrained optimization.</li>
                <li><strong>What industries use QAOA for practical applications?</strong><br>
                Identify use cases in logistics, finance, and telecommunications.</li>
                <li><strong>How is QAOA parameter optimization performed efficiently?</strong><br>
                Compare strategies including transfer learning, warm-starting, and adaptive methods.</li>
            </ol>
        </div>
"""
    },
    6: {  # Error Correction
        "title": "Quantum Error Correction",
        "subtitle": "Protecting quantum information from decoherence through redundant encoding and syndrome detection",
        "extra_content": """
        <h2>Error Correction Fundamentals</h2>
        <p>
            Quantum error correction overcomes decoherence by encoding logical qubits into multiple physical qubits. The [[n,k,d]] notation describes codes using n physical qubits to encode k logical qubits with distance d (minimum weight of undetectable errors). The Shor code [[9,1,3]] protects against any single-qubit error, while the Steane code [[7,1,3]] uses fewer qubits with transversal gate support.
        </p>

        <table>
            <thead>
                <tr><th>Code</th><th>[n,k,d]</th><th>Threshold</th><th>Advantages</th><th>Applications</th></tr>
            </thead>
            <tbody>
                <tr><td>Shor</td><td>[9,1,3]</td><td>~1%</td><td>Corrects bit+phase flip</td><td>Pedagogical</td></tr>
                <tr><td>Steane</td><td>[7,1,3]</td><td>~2-3%</td><td>Transversal gates</td><td>Fault-tolerant</td></tr>
                <tr><td>Surface</td><td>[d²,1,d]</td><td>~1%</td><td>2D, high threshold</td><td>Hardware implementation</td></tr>
                <tr><td>Color</td><td>[varies]</td><td>~1%</td><td>Transversal T-gate</td><td>Advanced FT</td></tr>
            </tbody>
        </table>

        <h3>Fault-Tolerant Computation</h3>
        <p>
            Fault-tolerant gates ensure errors don't propagate catastrophically through encoded qubits. Transversal gates apply the same operation independently to each physical qubit, naturally limiting error spread. The Eastin-Knill theorem proves no code supports universal transversal gates, necessitating magic state distillation for non-Clifford operations like the T-gate.
        </p>

        <table>
            <thead>
                <tr><th>Gate Type</th><th>Implementation</th><th>Error Propagation</th><th>Resource Cost</th></tr>
            </thead>
            <tbody>
                <tr><td>Clifford (H, S, CNOT)</td><td>Transversal</td><td>Low</td><td>O(1) overhead</td></tr>
                <tr><td>T-gate</td><td>Magic state injection</td><td>Controlled</td><td>High - distillation</td></tr>
                <tr><td>Measurement</td><td>Syndrome extraction</td><td>Low</td><td>O(1) ancillas</td></tr>
            </tbody>
        </table>

        <h2>Review Questions</h2>
        <div class="info-box">
            <ol>
                <li><strong>Why can't quantum errors be corrected by measurement and correction like classical bits?</strong><br>
                Explain how the no-cloning theorem and measurement collapse require different approaches.</li>
                <li><strong>How do stabilizer codes detect errors without measuring data qubits?</strong><br>
                Describe syndrome extraction using stabilizer generators and ancilla qubits.</li>
                <li><strong>What is the threshold theorem and why is it important?</strong><br>
                Explain how error rates below threshold enable arbitrarily long quantum computation.</li>
                <li><strong>How does the surface code achieve high error thresholds?</strong><br>
                Discuss local interactions, topological protection, and efficient decoding.</li>
                <li><strong>What resources are required for magic state distillation?</strong><br>
                Quantify the qubit and gate overhead for fault-tolerant T-gates.</li>
                <li><strong>How many physical qubits are needed for useful fault-tolerant computation?</strong><br>
                Estimate requirements for running Shor's algorithm on 2048-bit RSA.</li>
                <li><strong>What experimental progress has been made in quantum error correction?</strong><br>
                Review recent demonstrations and remaining challenges for scalable QEC.</li>
            </ol>
        </div>
"""
    },
    7: {  # Implementation
        "title": "Implementation and Software Tools",
        "subtitle": "Practical quantum algorithm implementation using modern quantum computing frameworks and simulators",
        "extra_content": """
        <h2>Quantum Computing Frameworks</h2>
        <p>
            Modern quantum algorithm development relies on high-level frameworks that abstract hardware details while providing efficient compilation and optimization. Qiskit (IBM), Cirq (Google), and PennyLane (Xanadu) offer Python APIs for circuit construction, simulation, and execution on real quantum processors. The WIA-QUANTUM_AL standard ensures interoperability across these platforms.
        </p>

        <table>
            <thead>
                <tr><th>Framework</th><th>Developer</th><th>Strengths</th><th>Hardware Access</th></tr>
            </thead>
            <tbody>
                <tr><td>Qiskit</td><td>IBM</td><td>Comprehensive, mature ecosystem</td><td>IBM Quantum, cloud</td></tr>
                <tr><td>Cirq</td><td>Google</td><td>NISQ optimization, research</td><td>Google Quantum AI</td></tr>
                <tr><td>PennyLane</td><td>Xanadu</td><td>Quantum ML integration</td><td>Multi-backend</td></tr>
                <tr><td>Q#</td><td>Microsoft</td><td>High-level language, Azure</td><td>Azure Quantum</td></tr>
            </tbody>
        </table>

        <h3>Circuit Optimization Techniques</h3>
        <p>
            Transpilation converts high-level quantum circuits to hardware-native gate sets while optimizing for depth, gate count, and qubit connectivity. Advanced techniques include gate commutation, template matching for known patterns, and adaptive routing for limited qubit connectivity. Noise-aware compilation selects gate sequences minimizing expected error rates based on calibration data.
        </p>

        <table>
            <thead>
                <tr><th>Optimization</th><th>Technique</th><th>Impact</th><th>When to Use</th></tr>
            </thead>
            <tbody>
                <tr><td>Gate Reduction</td><td>Peephole optimization</td><td>Reduce gate count 20-40%</td><td>All circuits</td></tr>
                <tr><td>Qubit Mapping</td><td>SABRE routing</td><td>Minimize SWAP overhead</td><td>Limited connectivity</td></tr>
                <tr><td>Noise Adaptation</td><td>Calibration-aware compilation</td><td>Improve fidelity 10-20%</td><td>NISQ devices</td></tr>
            </tbody>
        </table>

        <h2>Review Questions</h2>
        <div class="info-box">
            <ol>
                <li><strong>How do quantum circuit simulators work?</strong><br>
                Explain state vector simulation and its O(2^n) memory complexity.</li>
                <li><strong>What are the tradeoffs between different quantum frameworks?</strong><br>
                Compare ease of use, performance, hardware access, and ecosystem maturity.</li>
                <li><strong>How does transpilation optimize circuits for specific hardware?</strong><br>
                Describe gate decomposition, routing, and scheduling stages.</li>
                <li><strong>What validation techniques ensure quantum algorithm correctness?</strong><br>
                Discuss unit testing, state tomography, and process tomography.</li>
                <li><strong>How can classical simulation accelerate quantum algorithm development?</strong><br>
                Explain the role of simulators in debugging and small-scale validation.</li>
                <li><strong>What benchmarks measure quantum algorithm performance?</strong><br>
                Review metrics including quantum volume, CLOPS, and application-specific benchmarks.</li>
                <li><strong>How does the WIA-QUANTUM_AL standard ensure implementation quality?</strong><br>
                Describe certification requirements and compliance testing procedures.</li>
            </ol>
        </div>
"""
    },
    8: {  # Future Directions
        "title": "Future Directions and Emerging Applications",
        "subtitle": "The roadmap toward fault-tolerant quantum computing and transformative applications across industries",
        "extra_content": """
        <h2>The Path to Fault-Tolerant Quantum Computing</h2>
        <p>
            The quantum computing field is transitioning from NISQ devices to early fault-tolerant systems. Current systems with 50-1000 noisy qubits will evolve into machines with thousands of error-corrected logical qubits by the early 2030s. This transition requires advances in qubit quality (gate fidelities >99.9%), scalable architectures (modular systems, quantum interconnects), and efficient error correction (high-threshold codes, fast decoding).
        </p>

        <table>
            <thead>
                <tr><th>Era</th><th>Timeline</th><th>Capabilities</th><th>Key Milestones</th></tr>
            </thead>
            <tbody>
                <tr><td>NISQ</td><td>2020-2027</td><td>100-1000 noisy qubits</td><td>Quantum advantage demos</td></tr>
                <tr><td>Early FT</td><td>2027-2032</td><td>10-100 logical qubits</td><td>Useful chemistry, optimization</td></tr>
                <tr><td>Full FT</td><td>2032+</td><td>1000+ logical qubits</td><td>Breaking RSA, drug design</td></tr>
            </tbody>
        </table>

        <h3>Transformative Applications</h3>
        <p>
            Quantum algorithms will revolutionize multiple industries. In pharmaceuticals, quantum simulation of molecular interactions will accelerate drug discovery by predicting binding affinities and reaction pathways. Financial institutions will use quantum optimization for portfolio management and risk analysis. Materials science will benefit from quantum simulation of novel compounds for batteries, catalysts, and superconductors. Machine learning algorithms will leverage quantum speedups for training and inference.
        </p>

        <table>
            <thead>
                <tr><th>Industry</th><th>Application</th><th>Quantum Advantage</th><th>Timeline</th></tr>
            </thead>
            <tbody>
                <tr><td>Pharmaceuticals</td><td>Drug discovery, protein folding</td><td>Exponential (simulation)</td><td>2028-2032</td></tr>
                <tr><td>Finance</td><td>Portfolio optimization, risk</td><td>Quadratic (optimization)</td><td>2025-2028</td></tr>
                <tr><td>Materials</td><td>Catalyst design, batteries</td><td>Exponential (simulation)</td><td>2028-2033</td></tr>
                <tr><td>AI/ML</td><td>Quantum neural networks</td><td>Problem-dependent</td><td>2026-2030</td></tr>
                <tr><td>Cryptography</td><td>Post-quantum security</td><td>Breaking current crypto</td><td>2030-2035</td></tr>
            </tbody>
        </table>

        <h2>Review Questions</h2>
        <div class="info-box">
            <ol>
                <li><strong>What technical advances are needed for fault-tolerant quantum computing?</strong><br>
                Discuss qubit quality, error correction, and architectural requirements.</li>
                <li><strong>Which quantum algorithms are most likely to provide near-term value?</strong><br>
                Evaluate VQE, QAOA, and quantum machine learning for NISQ devices.</li>
                <li><strong>How will quantum computing impact drug discovery?</strong><br>
                Explain quantum simulation of molecular systems and its advantages.</li>
                <li><strong>What role does quantum computing play in the future of cryptography?</strong><br>
                Discuss both threats to current systems and quantum-safe alternatives.</li>
                <li><strong>How will quantum and classical computing work together?</strong><br>
                Describe hybrid architectures and quantum-classical algorithms.</li>
                <li><strong>What ethical considerations arise from quantum computing?</strong><br>
                Address security implications, accessibility, and environmental impact.</li>
                <li><strong>How can organizations prepare for the quantum computing era?</strong><br>
                Recommend strategies for workforce development, partnerships, and technology adoption.</li>
            </ol>
        </div>
"""
    }
}


def add_content_to_chapter(filepath, chapter_num):
    """Add enhanced content to a chapter file"""

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Get enhancement data
    if chapter_num not in CHAPTER_ENHANCEMENTS:
        print(f"No enhancement data for chapter {chapter_num}, skipping detailed update")
        return

    enh = CHAPTER_ENHANCEMENTS[chapter_num]

    # Find and replace title and subtitle if generic
    if "Current Challenges" in content or "Technical Standards" in content or "Market Analysis" in content:
        # Update title
        content = re.sub(
            r'<h1>⚛️.*?</h1>',
            f'<h1>⚛️ {enh["title"]}</h1>',
            content
        )

        # Update subtitle
        content = re.sub(
            r'<p style="font-size: 1\.1rem;.*?</p>',
            f'<p style="font-size: 1.1rem; color: var(--text-secondary); margin-top: 1rem;">\n            {enh["subtitle"]}\n        </p>',
            content,
            count=1
        )

    # Add extra content before Summary section if not already there
    if "Review Questions" not in content and enh["extra_content"]:
        summary_pattern = r'(\s+<h2>Summary</h2>)'
        content = re.sub(summary_pattern, f'\n{enh["extra_content"]}\n\\1', content)

    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Enhanced {filepath}")


# Process chapters 3-8 for quantum-algorithm
base_path = "/home/user/wia-standards/standards/quantum-algorithm/ebook/en"

for chapter_num in [3, 4, 5, 6, 7, 8]:
    filepath = f"{base_path}/chapter-0{chapter_num}.html"
    if os.path.exists(filepath):
        print(f"Processing chapter {chapter_num}...")
        add_content_to_chapter(filepath, chapter_num)
    else:
        print(f"File not found: {filepath}")

print("\nDone! Checking final file sizes...")
for i in range(1, 9):
    filepath = f"{base_path}/chapter-0{i}.html"
    if os.path.exists(filepath):
        size = os.path.getsize(filepath)
        print(f"Chapter {i}: {size:,} bytes ({size/1024:.1f} KB)")
