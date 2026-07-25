# Lawn Care Customer App

The customer-facing side of a lawn-care service: booking, scheduling, loyalty rewards, and viewing the health of the customer's lawn.

## Language

**Lawn Health**:
The provider's assessment of the condition of a customer's lawn or a specific zone of it (e.g. excellent, fair, needs attention). Set by the provider, read-only to the customer.
_Avoid_: Lawn status, condition score

**Care Tip**:
A canned remedy suggested in response to a customer's free-text description of their lawn's condition (e.g. "sounds dry" → a watering suggestion). Distinct from Lawn Health — a Care Tip responds to what the *customer* describes, not what the provider has assessed.
_Avoid_: Recommendation, advice, diagnosis

**Chat with us**:
The conversational flow where a customer describes their lawn's condition in their own words and receives a Care Tip in response. Currently answered by local keyword matching against a small library of Care Tips; intended to eventually be answered by a real LLM without changing this flow's shape.
_Avoid_: Assistant, AI chat (not yet true — no LLM is involved today)
