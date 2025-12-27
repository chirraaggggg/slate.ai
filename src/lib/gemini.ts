import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY environment variable is not set");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function generateImagePrompt(name: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are a creative and helpful AI assistant capable of generating interesting thumbnail descriptions for notes. Your output will be fed into an image generation API to generate a thumbnail. The description should be minimalistic and flat styled. 

Please generate a concise thumbnail description (1-2 sentences) for a notebook titled: "${name}"`;

    const result = await model.generateContent(prompt);
    const image_description = result.response.text();
    
    return image_description as string;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function generateImage(image_description: string) {
  try {
    const pixabayApiKey = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;
    
    if (!pixabayApiKey) {
      throw new Error("Pixabay API key not found in environment variables");
    }

    // Use the image description as search query
    const searchQuery = encodeURIComponent(image_description.split(" ").slice(0, 3).join(" "));
    
    const response = await fetch(
      `https://pixabay.com/api/?key=${pixabayApiKey}&q=${searchQuery}&image_type=illustration&per_page=1&safesearch=true`
    );

    const data = await response.json();

    if (data.hits && data.hits.length > 0) {
      const image_url = data.hits[0].webformatURL;
      return image_url as string;
    } else {
      console.warn("No images found for the search query");
      return null;
    }
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}