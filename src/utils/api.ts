export const sendEmail = async (to: string, subject: string, text: string) => {
    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, subject, text }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send email");
  
      console.log("Email sent successfully");
      return data;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };
  