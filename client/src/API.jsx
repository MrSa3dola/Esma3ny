const BASE_API_URL = "https://74.249.184.185/";

const sendAudio = async ({ audioBlob, setResult }) => {
  if (!audioBlob) return;

  const formData = new FormData();
  formData.append("file", audioBlob, "recording.wav"); // Append the Blob as a file
  try {
    const response = await fetch(BASE_API_URL + "audio2text", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Audio converted successfully!");
      const result = await response.json();
      setResult(result.text);
    }
    return response.ok;
  } catch (error) {
    console.error("Error sending audio:", error);
    return false;
  }
};

const sendText = async ({ englishText, isChecked, setResult }) => {
  if (!englishText) return;
  const endpoint = isChecked ? "translate/auto" : "translate/en-ar";
  try {
    const response = await fetch(BASE_API_URL + `${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: englishText }),
    });

    if (response.ok) {
      console.log("Text translated successfully!");
      const result = await response.json();
      setResult(result.translation);
    }
  } catch (error) {
    console.error("Error sending text:", error);
  }
};

export { sendAudio, sendText };