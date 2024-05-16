"use server";
import { QuestionnaireEntry } from "@prisma/client";
import AWS from "aws-sdk";
import { camelCaseToTitleCase } from "../../utils";
// Set up AWS SES
const ses = new AWS.SES({
  region: "us-east-2", // e.g., 'us-east-1'
  accessKeyId: process.env.SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

export const sendQuestionnaireEmail = async (data: QuestionnaireEntry) => {
  // Define email parameters
  data.usage = data.usage
    .split(", ")
    .map((useCase) => camelCaseToTitleCase(useCase))
    .join(", ");
  data.performance = data.performance
    .split(", ")
    .map((performance) => camelCaseToTitleCase(performance))
    .join(", ");
  data.aesthetics = data.aesthetics
    .split(", ")
    .map((aesthetic) => camelCaseToTitleCase(aesthetic))
    .join(", ");
  const params = {
    Destination: {
      ToAddresses: [data.email], // Email addresses to send the email to
    },
    Message: {
      Body: {
        Html: {
          Data: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank You</title>
</head>
<body style="font-family: Arial, sans-serif; padding: 20px; background-color: #121212; color: #fff;">
  <div style="max-width: 600px; margin: 0 auto; border: 1px solid #00daff; padding: 20px; border-radius: 10px; overflow: hidden; background-color: #121212;">
    <div>
      <a href="https://blazingbuilds.com">
        <img style="width: 128px; height: auto; margin: 0 auto; display: block;" src="https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af194931ee5fb2580c4bb77adebb3f4c1602332bc6b763f196560a679545bb031dba132a3cc14015a178565af3c0e8fb41b9d4a0adb36926c59158865f276bb1791278f" />
      </a>
    </div>
    <div style="width: 100%; height: 0px; border: solid 2px rgba(229, 231, 235, 0.05); background-color: rgba(229, 231, 235, 0.05); border-radius: 10px; margin: 10px 0;"></div>

    <h1 style="text-align: center;">Thank you for your interest in our services!</h1>
    <h3 style="text-align: center;">We have received your request for a quote and will get back to you as soon as possible.</h3>

    <div style="width: 100%; height: 0px; border: solid 1px rgba(229, 231, 235, 0.05); background-color: rgba(229, 231, 235, 0.05); border-radius: 10px;"></div>

    <p>Here is your confirmation code: <strong style="color: #00daff;">1A3j5sI</strong></p>
    <p>You can check the status of your query at <a href="https://blazingbuilds.com/status" style="color: #00daff;">https://blazingbuilds.com/status</a></p>

    <div style="width: 100%; height: 0px; border: solid 1px rgba(229, 231, 235, 0.05); background-color: rgba(229, 231, 235, 0.05); border-radius: 10px; margin: 10px 0;"></div>

    <p style="font-size: 0.8rem;"><strong>Please note:</strong> This is an automated message. No further messages will be sent. If you have any questions or concerns, please contact us at <a href="mailto: Support@blazingbuilds.com" style="color: #00daff;">Support@blazingbuilds.com</a>.</p>

    <div style="width: 100%; height: 0px; border: solid 1px rgba(229, 231, 235, 0.05); background-color: rgba(229, 231, 235, 0.05); border-radius: 10px; margin: 10px 0;"></div>
  </div>
  <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">Blazing Builds LLC &copy; 2024. All rights reserved.</footer>

  <!-- Media query for dark mode -->
  <style>
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #000; /* Dark mode background color */
        color: #fff; /* Dark mode text color */
      }
      a, strong {
        color: #00daff; /* Dark mode link and strong color */
      }
    }
  </style>
</body>
</html>

          `, // Email body
        },
      },
      Subject: {
        Data: "Request for PC Quote Recieved!", // Email subject
      },
    },
    Source: "mramazzini123@gmail.com", // Email address of the sender
  };

  // Send the email
  ses.sendEmail(params, (err, data) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Email sent successfully:", data);
    }
  });
};
