import { GoogleGenerativeAI } from '@google/generative-ai'
import type { WellnessLog } from './types'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '')

export async function generateAthleteAnalysis(athleteName: string, logs: WellnessLog[]): Promise<string> {
  if (!genAI) {
    return 'AI analysis unavailable: API key not configured.'
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `You are a professional strength & conditioning coach analyzing wellness data.

Athlete: ${athleteName}
Recent Wellness Logs:
${logs.map(l => `- Date: ${l.date}, Fatigue: ${l.fatigue}/5, Sleep: ${l.sleepQuality}/10, Motivation: ${l.motivation}/10, Soreness: ${l.soreness.join(', ')}`).join('\n')}

Provide a concise 3-sentence coach's analysis:
1. Identify the main trend (improving/worsening)
2. Highlight the primary concern
3. Recommend ONE specific action (e.g., deload, rest day, reduce volume)`

    const result = await model.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.error('Gemini API Error:', error)
    return 'AI analysis temporarily unavailable.'
  }
}

export async function generateSessionAdjustment(
  fatigue: number,
  sleep: number,
  blockName: string
): Promise<string> {
  if (!genAI) {
    return 'Consider reducing intensity or taking a rest day.'
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `You are a coach using RIR/RPE auto-regulation.

Today's athlete readiness:
- Fatigue: ${fatigue}/5 (5 = exhausted)
- Sleep Quality: ${sleep}/10
- Planned Session: ${blockName}

Provide ONE sentence of actionable advice using RIR/RPE terminology (e.g., "Increase target RIR by 1-2 on compounds" or "Maintain intensity but reduce volume by 1 set").`

    const result = await model.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.error('Gemini API Error:', error)
    return 'Consider reducing training volume by 20% today.'
  }
}

export async function generateMealSuggestion(
  mealName: string,
  slots: Record<string, number>
): Promise<string> {
  if (!genAI) {
    return 'Mix your favorite foods from each group!'
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const slotDescription = Object.entries(slots)
      .map(([group, count]) => `${count}x ${group}`)
      .join(', ')

    const prompt = `You are a sports nutritionist. Suggest a simple, practical meal idea for "${mealName}" that uses:
${slotDescription}

Respond in ONE sentence, starting with "Try:". Be creative but realistic (e.g., "Try: Oatmeal with protein powder, banana, and almonds").`

    const result = await model.generateContent(prompt)
    return result.response.text().replace(/^Try:\s*/i, 'Try: ')
  } catch (error) {
    console.error('Gemini API Error:', error)
    return 'Try: Mix your favorite foods from each portion group!'
  }
}
