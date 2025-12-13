"use server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
  dangerouslyAllowBrowser: true,
});

export async function generateStructuredJobDescription(
  unstructuredText: string
): Promise<string> {
  if (!unstructuredText || unstructuredText.trim() === "") {
    return "";
  }
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a professional HR assistant specializing in creating well-structured job descriptions. 
Format job descriptions with clear sections including:
- Role Summary
- Key Responsibilities (bulleted list)
- Location & Work Arrangement

Use proper formatting with line breaks, indentation, and clear hierarchies. Make the content professional, clear, and engaging.`,
      },
      {
        role: "user",
        content: `Please convert the following unstructured job information into a well-formatted, professional job description:

${unstructuredText}`,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    max_tokens: 2048,
  });

  return completion.choices[0]?.message?.content || "";
}

export async function generateStructuredJobRequirements(
  unstructuredText: string
): Promise<string> {
  if (!unstructuredText || unstructuredText.trim() === "") {
    return "";
  }
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a professional HR assistant specializing in creating well-structured job requirements. 
Format job requirements with clear sections including:

## Required Qualifications
- Education requirements
- Years of experience needed
- Essential technical skills
- Mandatory certifications

## Preferred Qualifications
- Additional education
- Bonus experience areas
- Nice-to-have technical skills
- Optional certifications

## Technical Skills
- Programming languages
- Frameworks and tools
- Platforms and systems
- Methodologies

## Soft Skills
- Communication abilities
- Leadership qualities
- Problem-solving skills
- Collaboration skills

Use proper formatting with line breaks, bullet points, and clear hierarchies. Be specific and measurable where possible. Remove redundancy and organize logically.`,
      },
      {
        role: "user",
        content: `Please convert the following unstructured job requirements into a well-formatted, professional requirements list:

${unstructuredText}`,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.6,
    max_tokens: 2048,
  });

  return completion.choices[0]?.message?.content || "";
}

export async function generateStructuredJobBenefits(
  unstructuredText: string
): Promise<string> {
  if (!unstructuredText || unstructuredText.trim() === "") {
    return "";
  }
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a professional HR assistant specializing in creating well-structured job benefits sections. 
Format job benefits with clear sections including:

## Compensation & Financial Benefits
- Base salary and bonuses
- Stock options/equity
- 401(k) matching
- Profit sharing

## Health & Wellness
- Medical insurance
- Dental and vision coverage
- Mental health support
- Wellness programs
- Gym memberships

## Time Off & Work-Life Balance
- Paid time off (PTO)
- Sick leave
- Parental leave
- Sabbaticals
- Flexible working hours

## Professional Development
- Training and courses
- Conference attendance
- Certification support
- Tuition reimbursement
- Mentorship programs

## Work Environment & Perks
- Remote work options
- Office amenities
- Equipment provided
- Team events
- Food and beverages

## Additional Benefits
- Commuter benefits
- Life insurance
- Disability insurance
- Employee assistance programs
- Pet insurance
- Relocation assistance

Use proper formatting with line breaks, bullet points, and clear hierarchies. Be specific and attractive. Highlight unique or standout benefits.`,
      },
      {
        role: "user",
        content: `Please convert the following unstructured benefits information into a well-formatted, professional benefits section:

${unstructuredText}`,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.6,
    max_tokens: 2048,
  });

  return completion.choices[0]?.message?.content || "";
}

interface QAHistory {
  question: string;
  answer: string;
}

interface QuestionWiseEvaluation {
  question: string;
  answer: string;
  score: number;
  feedback: string;
  masked: boolean;
}

interface EvaluationResult {
  overall_feedback: string;
  total_score: number;
  question_wise: QuestionWiseEvaluation[];
}

export async function generateInterviewEvaluation(
  qaHistory: QAHistory[]
): Promise<EvaluationResult> {
  if (qaHistory.length === 0) {
    return {
      overall_feedback: "",
      total_score: 0,
      question_wise: [],
    };
  }
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an expert technical interviewer and evaluator. Your task is to evaluate interview responses and provide detailed feedback.

Evaluate each question-answer pair based on:
1. Technical accuracy and correctness
2. Depth of understanding
3. Relevance to the question asked
4. Completeness of the answer
5. Demonstration of practical knowledge

Scoring Guidelines (0-10 per question):
- 0-2: Completely irrelevant, wrong, or no meaningful answer
- 3-4: Attempted answer but with major misunderstandings or gaps
- 5-6: Partially correct with some understanding but incomplete
- 7-8: Good answer with solid understanding, minor gaps
- 9-10: Excellent, comprehensive answer demonstrating deep understanding

You MUST respond with ONLY valid JSON in this exact format:
{
  "overall_feedback": "string - comprehensive summary of candidate's performance",
  "total_score": number - sum of all individual scores,
  "question_wise": [
    {
      "question": "string - the original question",
      "answer": "string - the candidate's answer",
      "score": number - score from 0-10,
      "feedback": "string - specific feedback on this answer",
      "masked": false
    }
  ]
}

CRITICAL: Return ONLY the JSON object, no markdown, no preamble, no explanation.`,
      },
      {
        role: "user",
        content: `Evaluate the following interview Q&A history and provide detailed feedback:

${JSON.stringify(qaHistory, null, 2)}

Remember: Respond with ONLY the JSON object, nothing else.`,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    max_tokens: 4096,
    response_format: { type: "json_object" },
  });

  const content = completion.choices[0]?.message?.content || "{}";
  return JSON.parse(content) as EvaluationResult;
}
