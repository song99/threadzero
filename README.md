## Inspiration

The global apparel industry is one of the heaviest polluters, often operating in direct conflict with global ESG (Environmental, Social, and Governance) goals. We realized that the true potential of AI in this space isn't just about selling more t-shirts, it's about fundamentally shifting consumer behavior and manufacturing toward verifiable sustainability.

We were inspired to create a system where eco-conscious design meets measurable environmental impact. We wanted to answer a critical question: _How can we leverage advanced Multi-Agent AI to not only generate and validate zero-waste digital clothing campaigns but also directly tie these sustainable choices to Carbon Credit rewards for eco-conscious backers?_ Thus, **ThreadZero** was born, not just as a marketplace, but as an AI-driven sustainability engine designed to heal the environment.

## What it does

ThreadZero is an AI-driven, multi-agent ESG platform masquerading as a creative marketplace. It empowers users to type a simple text prompt (e.g., "Minimalist wild elephant in bamboo forest") and instantly handles the entire zero-waste product lifecycle, rewarding sustainable pledges with verified carbon credits.

## How we built it

We architected ThreadZero using a modern, decoupled tech stack optimized for performance and scalability:

- **Frontend:** Built strictly on **Angular **, leveraging the latest `Signals` for highly reactive state management. The UI is clean, intuitive, and deployed globally via **Firebase Hosting**.
- **Backend & AI Orchestration:** Powered by **FastAPI (Python)** and deployed on **Google Cloud Run** for stateless, auto-scaling execution. The core intelligence is driven by the **Google Agent Development Kit (ADK)** and the Gemini model, allowing our agents to reason and execute tasks independently.
- **Database Integration:** We integrated **Model Context Protocol (MCP)** to allow our Campaign Agent to securely interface with **MongoDB**, ensuring that AI-generated context is structurally saved without rigid hardcoding.

## Challenges we ran into

Building a synchronous UI on top of asynchronous multi-agent workflows presented significant hurdles.

1.  **Agent Latency vs. UX:** Waiting for Agent 1 to generate an image and Agent 2 to process it could lead to frontend timeouts. We solved this by implementing an intelligent fallback mechanism and caching strategies in our Angular 19 `Signals` state, ensuring the UI remained fluid.
2.  **Cloud Deployment Dependencies:** Deploying a complex Python environment containing `google-adk`, `mcp`, and `grpc` onto Google Cloud Run caused severe dependency conflicts and IAM permission issues. We overcame this by refining our Docker containerization strategy, utilizing strict requirement definitions, and assigning the correct Cloud Storage and Artifact Registry roles.
3.  **CORS & Cross-Origin Communication:** Bridging the gap between Firebase Hosting and Google Cloud Run required strict middleware configuration to allow secure data flow without exposing the system to vulnerabilities.

## Accomplishments that we're proud of

- Successfully implementing the **Google Agent Development Kit (ADK)** to orchestrate a true multi-agent handoff, rather than relying on simple API wrappers.
- Integrating **MCP (Model Context Protocol)** in a hackathon setting, bridging the gap between LLM reasoning and structured database operations.
- Delivering a flawless, production-ready frontend using **Angular 19 Signals**, proving that complex AI platforms can still provide lightning-fast, reactive user experiences.

## What we learned

- **Agentic Orchestration is the Future:** We learned that defining clear boundaries and tools for individual agents (Designer vs. QA vs. Database Manager) yields much more reliable results than prompting a single monolith model.
- **Cloud Infrastructure Nuances:** Troubleshooting Cloud Build logs deeply improved our understanding of containerizing complex AI workflows on Google Cloud Run.
- **Modern Angular Power:** Moving away from older state management paradigms to Angular 19's Signals drastically reduced our boilerplate code and made handling asynchronous AI responses a breeze.

## What's next for ThreadZero

Our immediate next step is to integrate real manufacturing APIs, allowing campaigns that reach their funding goals to be automatically sent for sustainable production. We also plan to expand our Multi-Agent system to include an "Eco-Auditor Agent" that analyzes the prompt and selected materials to generate a verified Carbon Footprint score for every piece of clothing sold on the platform.
