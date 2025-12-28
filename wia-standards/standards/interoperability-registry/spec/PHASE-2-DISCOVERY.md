# WIA-CORE-004: Interoperability Registry
## PHASE 2: DISCOVERY & SEARCH

**Version:** 1.0  
**Status:** Active  
**Last Updated:** 2025-01-27

---

## Overview

Phase 2 builds advanced discovery and search capabilities on top of the foundation established in Phase 1. This phase enables users to efficiently find compatible systems, standards, and protocols through powerful search, filtering, and recommendation features.

## Objectives

1. **Full-Text Search** - Implement Elasticsearch-based full-text search across all metadata
2. **Advanced Filtering** - Multi-dimensional filtering by attributes, relationships, and metadata
3. **Semantic Search** - Natural language understanding for intent-based queries
4. **Recommendation Engine** - ML-based suggestions for compatible systems
5. **Graph Queries** - Traverse relationships between standards, systems, and protocols
6. **Search Analytics** - Track search patterns and optimize results

## Architecture Components

### 1. Search Service

Microservice dedicated to search operations.

**Technology Stack:**
- **Search Engine:** Elasticsearch 8.x
- **Vector Database:** Pinecone (for semantic search)
- **ML Framework:** TensorFlow / PyTorch
- **Language:** Python (FastAPI)

**API Endpoints:**

```
GET    /api/v1/search              Full-text search
POST   /api/v1/search/advanced     Advanced search with complex criteria
GET    /api/v1/search/suggest      Auto-complete suggestions
POST   /api/v1/search/semantic     Semantic search
GET    /api/v1/recommendations     Get recommendations
POST   /api/v1/graph/query         Graph traversal queries
```

### 2. Elasticsearch Configuration

**Index Mapping:**

```json
{
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "type": { "type": "keyword" },
      "name": {
        "type": "text",
        "fields": {
          "keyword": { "type": "keyword" },
          "suggest": { "type": "completion" }
        }
      },
      "description": {
        "type": "object",
        "properties": {
          "en": { "type": "text", "analyzer": "english" },
          "ko": { "type": "text", "analyzer": "korean" },
          "es": { "type": "text", "analyzer": "spanish" }
        }
      },
      "version": { "type": "keyword" },
      "metadata": {
        "properties": {
          "status": { "type": "keyword" },
          "tags": { "type": "keyword" },
          "created": { "type": "date" },
          "updated": { "type": "date" }
        }
      },
      "implements": {
        "type": "nested",
        "properties": {
          "standard": { "type": "keyword" },
          "version": { "type": "keyword" },
          "certification": {
            "properties": {
              "status": { "type": "keyword" }
            }
          }
        }
      },
      "capabilities": { "type": "keyword" },
      "embedding": {
        "type": "dense_vector",
        "dims": 768,
        "index": true,
        "similarity": "cosine"
      }
    }
  }
}
```

**Search Queries:**

```python
# Full-text search with highlighting
def search_entries(query: str, filters: Dict) -> SearchResults:
    search_query = {
        "query": {
            "bool": {
                "must": [
                    {
                        "multi_match": {
                            "query": query,
                            "fields": ["name^3", "description.*^2", "capabilities"],
                            "type": "best_fields",
                            "fuzziness": "AUTO"
                        }
                    }
                ],
                "filter": build_filters(filters)
            }
        },
        "highlight": {
            "fields": {
                "name": {},
                "description.*": {}
            }
        },
        "size": filters.get('limit', 20),
        "from": filters.get('offset', 0)
    }
    
    return es.search(index="registry_entries", body=search_query)

def build_filters(filters: Dict) -> List[Dict]:
    es_filters = []
    
    if 'type' in filters:
        es_filters.append({"term": {"type": filters['type']}})
    
    if 'status' in filters:
        es_filters.append({"term": {"metadata.status": filters['status']}})
    
    if 'tags' in filters:
        es_filters.append({"terms": {"metadata.tags": filters['tags']}})
    
    if 'implements' in filters:
        es_filters.append({
            "nested": {
                "path": "implements",
                "query": {
                    "bool": {
                        "must": [
                            {"term": {"implements.standard": std}}
                            for std in filters['implements']
                        ]
                    }
                }
            }
        })
    
    if 'dateRange' in filters:
        es_filters.append({
            "range": {
                "metadata.created": {
                    "gte": filters['dateRange']['from'],
                    "lte": filters['dateRange']['to']
                }
            }
        })
    
    return es_filters
```

### 3. Semantic Search

Natural language understanding for intent-based queries.

**Approach:** Sentence embeddings using transformer models

**Model:** sentence-transformers/all-MiniLM-L6-v2 (384 dimensions)

**Implementation:**

```python
from sentence_transformers import SentenceTransformer
import numpy as np

class SemanticSearchService:
    def __init__(self):
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self.pinecone_index = pinecone.Index('registry-embeddings')
    
    async def index_entry(self, entry: RegistryEntry):
        # Create text representation
        text = f"{entry.name}. {entry.description.get('en', '')}"
        if hasattr(entry, 'capabilities'):
            text += f" Capabilities: {', '.join(entry.capabilities)}"
        
        # Generate embedding
        embedding = self.model.encode(text)
        
        # Store in vector database
        self.pinecone_index.upsert([(
            entry.id,
            embedding.tolist(),
            {
                "type": entry.type,
                "name": entry.name,
                "status": entry.metadata.status
            }
        )])
    
    async def semantic_search(
        self,
        query: str,
        filters: Dict = {},
        top_k: int = 20
    ) -> List[SearchResult]:
        # Generate query embedding
        query_embedding = self.model.encode(query)
        
        # Search vector database
        results = self.pinecone_index.query(
            vector=query_embedding.tolist(),
            top_k=top_k,
            filter=filters,
            include_metadata=True
        )
        
        # Fetch full entries from main database
        entry_ids = [match['id'] for match in results['matches']]
        entries = await db.entries.find({"id": {"$in": entry_ids}})
        
        return [
            {
                "entry": entry,
                "score": match['score'],
                "explanation": generate_explanation(query, entry)
            }
            for entry, match in zip(entries, results['matches'])
        ]
```

### 4. Recommendation Engine

ML-based recommendations for compatible systems.

**Recommendation Types:**
1. **Content-Based:** Based on entry attributes and metadata
2. **Collaborative Filtering:** Based on what similar users found useful
3. **Graph-Based:** Based on relationship networks

**Implementation:**

```python
class RecommendationEngine:
    def __init__(self):
        self.graph = neo4j.GraphDatabase.driver(NEO4J_URI)
    
    async def get_recommendations(
        self,
        entry_id: str,
        user_context: UserContext,
        limit: int = 10
    ) -> List[Recommendation]:
        # Get entry details
        entry = await db.entries.find_one({"id": entry_id})
        
        # Combine multiple recommendation strategies
        content_recs = await self.content_based_recommendations(entry)
        collab_recs = await self.collaborative_recommendations(entry, user_context)
        graph_recs = await self.graph_based_recommendations(entry)
        
        # Merge and rank recommendations
        all_recs = self.merge_recommendations([
            (content_recs, 0.4),   # 40% weight
            (collab_recs, 0.3),    # 30% weight
            (graph_recs, 0.3)      # 30% weight
        ])
        
        return all_recs[:limit]
    
    async def content_based_recommendations(
        self,
        entry: RegistryEntry
    ) -> List[Recommendation]:
        # Find similar entries based on attributes
        similar_query = {
            "bool": {
                "should": [
                    {"terms": {"capabilities": entry.get('capabilities', [])}},
                    {"terms": {"metadata.tags": entry.metadata.tags}},
                    {"term": {"type": entry.type}}
                ],
                "must_not": [{"term": {"id": entry.id}}]
            }
        }
        
        results = es.search(
            index="registry_entries",
            body={"query": similar_query, "size": 20}
        )
        
        return [
            {
                "entry_id": hit['_id'],
                "score": hit['_score'],
                "reason": "Similar capabilities and tags"
            }
            for hit in results['hits']['hits']
        ]
    
    async def graph_based_recommendations(
        self,
        entry: RegistryEntry
    ) -> List[Recommendation]:
        # Use Neo4j to find connected entries
        with self.graph.session() as session:
            result = session.run("""
                MATCH (e:Entry {id: $entry_id})
                MATCH (e)-[:IMPLEMENTS|DEPENDS_ON|COMPATIBLE_WITH*1..2]-(related:Entry)
                WHERE related.status = 'active'
                RETURN related.id as id, COUNT(*) as strength
                ORDER BY strength DESC
                LIMIT 20
            """, entry_id=entry.id)
            
            return [
                {
                    "entry_id": record['id'],
                    "score": record['strength'],
                    "reason": "Connected in compatibility graph"
                }
                for record in result
            ]
```

### 5. Auto-Complete & Suggestions

Real-time suggestions as users type.

```python
@app.get("/api/v1/search/suggest")
async def get_suggestions(q: str, limit: int = 10):
    suggest_query = {
        "suggest": {
            "name-suggest": {
                "prefix": q,
                "completion": {
                    "field": "name.suggest",
                    "size": limit,
                    "skip_duplicates": true
                }
            },
            "tag-suggest": {
                "prefix": q,
                "completion": {
                    "field": "metadata.tags",
                    "size": limit
                }
            }
        }
    }
    
    results = es.search(index="registry_entries", body=suggest_query)
    
    return {
        "names": [
            option['text']
            for option in results['suggest']['name-suggest'][0]['options']
        ],
        "tags": [
            option['text']
            for option in results['suggest']['tag-suggest'][0]['options']
        ]
    }
```

### 6. Graph Database

Store and query relationships between entries.

**Technology:** Neo4j

**Graph Model:**

```cypher
// Node types
CREATE (s:Standard {id, name, version, status})
CREATE (sys:System {id, name, version, status})
CREATE (p:Protocol {id, name, version, status})

// Relationship types
CREATE (sys)-[:IMPLEMENTS {version, certification}]->(s)
CREATE (s)-[:DEPENDS_ON {version_constraint}]->(s2)
CREATE (s)-[:EXTENDS]->(s2)
CREATE (sys)-[:COMPATIBLE_WITH {partial: boolean}]->(sys2)
CREATE (sys)-[:USES_PROTOCOL]->(p)
```

**Graph Queries:**

```cypher
// Find all systems implementing a standard
MATCH (s:Standard {id: $standard_id})<-[:IMPLEMENTS]-(sys:System)
WHERE sys.status = 'active'
RETURN sys

// Find compatibility path between two systems
MATCH path = shortestPath(
    (sys1:System {id: $system1_id})-[:COMPATIBLE_WITH*..5]-(sys2:System {id: $system2_id})
)
RETURN path

// Find all standards a system depends on (transitive)
MATCH (sys:System {id: $system_id})-[:IMPLEMENTS]->(s:Standard)
MATCH (s)-[:DEPENDS_ON*0..10]->(dep:Standard)
RETURN COLLECT(DISTINCT dep)

// Recommend systems based on graph structure
MATCH (sys:System {id: $system_id})-[:IMPLEMENTS]->(s:Standard)
MATCH (other:System)-[:IMPLEMENTS]->(s)
WHERE other.id <> sys.id AND other.status = 'active'
WITH other, COUNT(s) as shared_standards
ORDER BY shared_standards DESC
LIMIT 10
RETURN other, shared_standards
```

## Search Analytics

Track and optimize search performance.

```typescript
interface SearchAnalytics {
  query: string;
  filters: Record<string, any>;
  results_count: number;
  clicked_results: string[];
  user_id?: string;
  session_id: string;
  timestamp: Date;
  response_time_ms: number;
}

// Track search events
await analytics.track({
  event: 'search_performed',
  properties: {
    query: searchQuery,
    results_count: results.length,
    has_filters: Object.keys(filters).length > 0
  }
});

// Optimize based on analytics
async function optimizeSearch() {
  // Find common queries with poor results
  const poor_queries = await db.search_analytics.aggregate([
    {
      $match: {
        timestamp: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      }
    },
    {
      $group: {
        _id: "$query",
        avg_results: { $avg: "$results_count" },
        count: { $sum: 1 }
      }
    },
    {
      $match: {
        avg_results: { $lt: 3 },
        count: { $gte: 10 }
      }
    }
  ]);
  
  // Suggest query improvements or add synonyms
  for (const query of poor_queries) {
    console.log(`Query "${query._id}" needs optimization`);
    // Add synonyms, adjust weights, etc.
  }
}
```

## Performance Optimization

### Caching Strategy

```typescript
class SearchCache {
  constructor(private redis: Redis) {}
  
  async get(
    query: string,
    filters: Record<string, any>
  ): Promise<SearchResults | null> {
    const key = this.getCacheKey(query, filters);
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }
  
  async set(
    query: string,
    filters: Record<string, any>,
    results: SearchResults,
    ttl: number = 300 // 5 minutes
  ): Promise<void> {
    const key = this.getCacheKey(query, filters);
    await this.redis.setex(key, ttl, JSON.stringify(results));
  }
  
  private getCacheKey(query: string, filters: Record<string, any>): string {
    return `search:${md5(JSON.stringify({ query, filters }))}`;
  }
}
```

### Query Optimization

- **Index Optimization:** Regular index analysis and optimization
- **Query Planning:** Analyze slow queries and optimize
- **Result Pagination:** Cursor-based pagination for large result sets
- **Aggregation Caching:** Cache common aggregations

## Success Criteria

Phase 2 is considered complete when:

1. ✅ Elasticsearch cluster operational across all regions
2. ✅ Full-text search with <100ms response time (p95)
3. ✅ Semantic search operational with >80% relevance
4. ✅ Recommendation engine providing relevant suggestions
5. ✅ Graph database storing all relationships
6. ✅ Auto-complete with <50ms response time
7. ✅ Search analytics dashboard operational
8. ✅ 95% search satisfaction score from user feedback
9. ✅ Load testing passed (1000 concurrent searches)
10. ✅ Documentation and examples published

## Timeline

- **Weeks 1-2:** Elasticsearch setup and indexing
- **Weeks 3-4:** Semantic search implementation
- **Weeks 5-6:** Recommendation engine
- **Weeks 7-8:** Graph database and relationship tracking
- **Weeks 9-10:** Analytics, optimization, testing

**Total Duration:** 10 weeks

---

**Previous Phase:** [PHASE-1-FOUNDATION.md](./PHASE-1-FOUNDATION.md)  
**Next Phase:** [PHASE-3-COMPLIANCE.md](./PHASE-3-COMPLIANCE.md)
