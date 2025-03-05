/**
 * Sends an OTP verification email via Brevo SMTP
 * @param email Recipient email address
 * @param otp The OTP code to send
 * @returns Promise that resolves when email is sent
 */
export const sendOTPEmail = async (email: string, otp: string): Promise<void> => {
  try {
    const response = await fetch("http://localhost:5000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        subject: "Your OTP for Qualityveda Attendance",
        text: `Your OTP code is: ${otp}`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to send email");
    }

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
};
