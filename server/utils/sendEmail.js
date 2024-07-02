const nodemailer=require("nodemailer")
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fashionhub03321@gmail.com',
      pass: 'ucrd deui zodl rjed',
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