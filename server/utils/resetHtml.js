const generateResetHtml=(token)=>{
    return `<div style="    background-color: white; border: 1px solid #E91E63; border-radius: 5px; padding: 10px;">
        <h1 >Fashion<span style="color: #E91E63;">Hub</span></h1>
        <h2>!Welcome to FashionHub</h2>
        <p style="font-size: 17px; line-height: 23px;">You are receiving this email because we received a password reset request for your account.
        Please click on the following link, or paste it into your browser to complete the process:</p>
            <p style="text-align: center; margin-top: 25px; margin-bottom: 25px;"><a href="http://localhost:3000/resetPassword?token=${token}" style="background-color: #E91E63; color: white; text-decoration: none;
             padding: 13px 20px; border-radius: 5px; font-weight: bold;">Reset Password</a></p>
            <p style="font-size: 17px; line-height: 23px;">This link will remain active for 10 minutes. If you did not initiate this request, please ignore this email.Warm regards, The FashionHub Team.</p>
            
    </div>`
}
module.exports=generateResetHtml