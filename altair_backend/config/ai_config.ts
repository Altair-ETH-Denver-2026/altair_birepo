export const LLM_MODELS = {
  runningSummary: ['grok-4-fast', 'grok-4', 'gpt-4o-mini'], // model fallback order for generating running chat summaries in Altair
  mainChat: ['grok-4-fast', 'grok-4', 'gpt-4o-mini'], // primary assistant response models for the trading assistant experience
  options: {
    'gpt-4o-mini': 'OpenAI', // map model ID to provider for API routing
    'gpt-4o': 'OpenAI', // map model ID to provider for API routing
    'gpt-4.1': 'OpenAI', // map model ID to provider for API routing
    'gpt-4.1-mini': 'OpenAI', // map model ID to provider for API routing
    'gpt-4.1-nano': 'OpenAI', // map model ID to provider for API routing
    'o4-mini': 'OpenAI', // map model ID to provider for API routing
    'o3-mini': 'OpenAI', // map model ID to provider for API routing
    'claude-3-5-sonnet-20241022': 'Anthropic', // map model ID to provider for API routing
    'claude-3-5-haiku-20241022': 'Anthropic', // map model ID to provider for API routing
    'claude-3-opus-20240229': 'Anthropic', // map model ID to provider for API routing
    'claude-3-sonnet-20240229': 'Anthropic', // map model ID to provider for API routing
    'claude-3-haiku-20240307': 'Anthropic', // map model ID to provider for API routing
    'gemini-1.5-pro': 'Google', // map model ID to provider for API routing
    'gemini-1.5-flash': 'Google', // map model ID to provider for API routing
    'gemini-1.5-flash-8b': 'Google', // map model ID to provider for API routing
    'sonar': 'Perplexity', // map model ID to provider for API routing
    'sonar-pro': 'Perplexity', // map model ID to provider for API routing
    'sonar-reasoning': 'Perplexity', // map model ID to provider for API routing
    'sonar-reasoning-pro': 'Perplexity', // map model ID to provider for API routing
    'grok-4': 'X', // map model ID to provider for API routing
    'grok-4-fast': 'X', // map model ID to provider for API routing
    'grok-4-fast-reasoning': 'X', // map model ID to provider for API routing
    'grok-4-fast-non-reasoning': 'X', // map model ID to provider for API routing
    'grok-4-1-fast-reasoning': 'X', // map model ID to provider for API routing
    'grok-code-fast-1': 'X', // map model ID to provider for API routing
    'grok-3': 'X', // map model ID to provider for API routing
    'grok-3-mini': 'X', // map model ID to provider for API routing
    'grok-2': 'X', // map model ID to provider for API routing
    'grok-2-mini': 'X', // map model ID to provider for API routing
  },
};

export const PROVIDER_KEYS = {
  'X': 'XAI_API_KEY', // env var containing X/XAI credentials for Altair's LLM calls
  'OpenAI': 'OPENAI_API_KEY', // env var containing OpenAI credentials for Altair's LLM calls
  'Anthropic': 'ANTHROPIC_API_KEY', // env var containing Anthropic credentials for Altair's LLM calls
  'Google': 'GOOGLE_API_KEY', // env var containing Google AI credentials for Altair's LLM calls
  'Perplexity': 'PERPLEXITY_API_KEY', // env var containing Perplexity credentials for Altair's LLM calls
};



export const SYSTEM_PROMPT = {
  basePrompt: `
      You are Altair, a friendly cryptocurrency trading assistant.
      Identify: Sell Token, Buy Token, and Amount.
      If info is missing, ask.

      If you are ready to execute, ask the user for confirmation and include an estimated amount of the buy token they would receive (label it as an estimate). Example:
      "You are about to swap 0.1 ETH for USDC. Estimated receive: ~180 USDC. Do you confirm?"

      If you only need to signal execution to the app, return JSON:
      { "type": "SWAP_INTENT", "sell": "ETH", "buy": "USDC", "amount": 0.1 }
      
      Use the user memory context as helpful background, but prioritize the latest user message if there is any conflict.
    `, // core system instruction that defines Altair's trading-assistant persona and swap intent protocol
  contextBlocks: {
    memoryBlock: {
      withData: `\nUser Memory Context (from prior chats; may be stale):\n\${JSON.stringify(memoryContextForPrompt)}`, // injects archived user memory to personalize AI responses
      empty: '\nUser Memory Context: none available yet.', // fallback when no memory exists to ground the AI
    },
    balancesBlock: {
      withData: `\nUser Balances (MongoDB snapshot; may be stale):\n\${JSON.stringify(balanceContextForPrompt)}`, // adds balance context so the AI can reference holdings
      empty: '\nUser Balances: none available yet.', // fallback when balances are unavailable in Altair's datastore
    },
    swapsBlock: {
      withData: `\nRecent Swaps (last 3 from MongoDB; may be stale):\n\${JSON.stringify(swapHistoryContext)}`, // supplies recent swaps for continuity and safety checks
      empty: '\nRecent Swaps: none available yet.', // fallback when no swap history exists
    },
  },
};

export const CHAT_SUMMARY_LATEST = {
  chatQuantity: 20, // number of recent chat turns summarized for AI context in Altair
  source: 'MongoDB' as '0G' | 'MongoDB', // default summary storage source used by the assistant pipeline
  sourceOptions: ['0G', 'MongoDB'] as const, // supported summary storage backends for AI memory
};
