const nodemailer=require("nodemailer")
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });
  const sendEmail=async(recieverEmail,bodyHtml,subject)=>{


    
    const mailOptions = {
        from: '"FashionHub" <maddison53@ethereal.email>',
        to: recieverEmail,
        subject,
        html: bodyHtml,
      };
      await transporter.sendMail(mailOptions)
    
    
        
    
  }
  module.exports=sendEmail
