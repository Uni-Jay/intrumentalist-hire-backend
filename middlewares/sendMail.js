
const nodemailer = require('nodemailer');

module.exports =  async (req, res) => {
  try {
    const { email, message, subject } = req.body;

    const output = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form Request From Secure Wolf</title>
        <style>
        body {
                font-family: Arial, Helvetica, sans-serif;
                background-color: #f5f5f5;
                color: black; /* Default text color for light mode */
            }
            @media (prefers-color-scheme: dark) {
                /* Dark mode styles */
                body {
                    background-color: #333; /* Dark background color */
                    color: white; /* Text color for dark mode */
                }
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border: 1px solid #fe6b6b;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            h1 {
                font-size: 24px;
                color: inherit; 
            }
            p {
                font-size: 16px;
                line-height: 1.5;
                color: inherit;
            }
            label {
                font-weight: bold;
                display: block;
                margin-top: 10px;
                color: inherit;
            }
    
            b {
                font-weight: 400;
                font-size: 16px;
                color: inherit;
            }
    
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Contact Form Request From Secure Wolf</h1>
            <p>Dear ${email},</p>
            <p>You have received a contact form request from a visitor on your website. Here are the details:</p>
            
            <label for="email">Email Address:  <b>${email}</b></label>
    
            <label for="subject">Subject: <b>${subject}</b></label>
    
            <label for="message">Message: <b>${message}</b></label>
        </div>
    </body>
    </html>
    `;

    // Send an email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,  
      service: `gmail`,
      auth: {
        user: `${process.env.EMAIL_TEST_USER}`,
        pass: `${process.env.EMAIL_TEST_PASS}`,
      },

      tls: {
        rejectUnauthorized: false,
      },

      secure: true,
    });

    const mailOptions = {
      from: `${email}`,
      to: `${process.env.EMAIL_TEST_USER}`,
      subject: `${subject}`,
      html: output,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json({ error: 'Email could not be sent.' });
      } else {
        res.status(200).json({ message: `Email sent successfully` });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something Went Wrong' });
  }
};


