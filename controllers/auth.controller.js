const db = require("../models");
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const User = db.Users;

exports.register = async (req, res) => {
    const { fullname, username, email, phone_number, street_number, street_name, location, lga, state, password} = req.body;

    try {

        if (!fullname || !username || !email || !phone_number || !street_number || !street_name || !location || !lga || !state || !password) {
          return res.status(400).json({ error: "Incomplete Parameters" });
        }

        //Check if there's an existing user
        const existingUser = await User.findOne({ where: { email: email } });
        if(existingUser) return res.status(400).json({ message: `User with ${email} already exists!` });

        // Hash the Password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Then, create the user
        const newUser = await User.create({
          fullname: fullname, 
          username: username, 
          email: email, 
          phone_number: phone_number, 
          street_number: street_number, 
          street_name: street_name, 
          location: location, 
          lga: lga, 
          state: state, 
          password: hashedPassword,
        });

        
        if(newUser) {
          return res.status(201).json({ 
            message: "Registration successful!"
          });  
        } 

    } catch(error) {
        return res.status(500).json({ error: `Failed to Register: ${error}` });
    }
   
}



exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {

    if(!email || !password) {
      return res.status(400).json({error: "Incomplete params"})
    }

    // Check if the user exists
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: 'Failed to Login!' });
    }

    // Check if the password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { password: passwordHash, id, ...otherDetails } = user.toJSON();

    // Create a token
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' }); 

    // Set the token in a cookie
    res.cookie('token', token, {
      maxAge: 3600000,
      httpOnly: false,
      secure: false, 
    });

    // Return the token and user details in the response
    return res.status(200).json(
    { 
        token: token, 
        userId: id, 
        message: 'Login successful' 
    });

  } catch (error) {
    return res.status(500).json({ error: 'Failed to log in' });
  }
};


exports.logout = (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
    });

    // Return a success message
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to logout' });
  }
};


exports.forgotPassword =  async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a unique OTP (four-digit code)
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    
    const token = jwt.sign({ otp }, process.env.SECRET_KEY, { expiresIn: '5m' });

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

      // Send the OTP to the user's email
      const mailOptions = {
        to: email,
        from: `${process.env.EMAIL_TEST_USER}`, 
        subject: 'Password Reset OTP',
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset OTP</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
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
                    border: 1px solid #e0e0e0;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                h2 {
                    font-size: 24px;
                    color: inherit;
                }
                p {
                    font-size: 16px;
                    line-height: 1.5;
                    color: inherit;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Password Reset OTP</h2>
                <p>Hello ${email},</p>
                <p>We have received a request to reset your password. Please use the following OTP (One-Time Password) to verify your identity and reset your password:</p>
                <p style="font-size: 24px; text-align: center; font-weight: bold; font-family: Arial, Helvetica, sans-serif; color: white; background-color: #fe6b6b; padding: 4px 6px; border-radius: 6px;">${otp}</p>
                <p>This OTP will expire in 5 minutes for security reasons. If you did not request a password reset, please disregard this email.</p>
                <p>If you have any questions or need further assistance, please don't hesitate to contact our support team.</p>
                <p>Thank you for using our service.</p>
                <p>Best regards,<br>Instrumentalist Hire</p>
            </div>
        </body>
        </html>`
      };
  

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json({ error: 'Email could not be sent.' });

      } else {

        // Set the token in a cookie
        res.cookie('passwordResetToken', token, {
          maxAge: 300, // 5mins
          httpOnly: false,
          secure: false, 
        });

        res.status(200).json(
          { 
              passwordResetToken: token, 
              message: 'Email sent successfully' 
          });
      }
    });

  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
};


exports.verifyOTP = async (req, res) => {
  const { enteredOTP } = req.body;
  const token = req.cookies.passwordResetToken;

  try {
    if (!token) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    // Verify and decode the token
    const { otp: encodedOTP } = jwt.verify(token, process.env.SECRET_KEY);

    // Compare the encoded OTP with the OTP submitted by the user
    if (enteredOTP !== encodedOTP) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // clear the Token
    res.clearCookie('passwordResetToken');

    return res.json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Something went wrong' });
  }
};


exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Hash the new password using bcrypt
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    //Update user password
    await User.update(
      {
        password: hashedNewPassword,
      }, 
      { 
        where: {
            email: email,
        } 
    });

    return res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};



