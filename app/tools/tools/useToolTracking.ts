// app/tools/tools/useToolTracking.ts
import { supabase } from '@/lib/supabaseClient'

export async function trackToolUsage(
  toolName: string,
  inputData: Record<string, unknown>,
  resultData: Record<string, unknown>
) {
  try {
    await supabase.from('tool_usage').insert({
      tool_name: toolName,
      input_data: inputData,
      result_data: resultData,
      created_at: new Date().toISOString(),
    })
  } catch {
    // Silently fail — tracking should never break the user experience
  }
}
