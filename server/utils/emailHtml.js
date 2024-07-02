const generateEmailHtml=(token)=>{
    return `<div style="    background-color: white; border: 1px solid #E91E63; border-radius: 5px; padding: 10px;">
        <h1 >Fashion<span style="color: #E91E63;">Hub</span></h1>
        <h2>!Welcome to FashionHub</h2>
        <p style="font-size: 17px; line-height: 23px;">We’re excited to have you join our fashion-forward community.
            To complete your registration and verify your email address, please click the link below:</p>
            <p style="text-align: center; margin-top: 25px; margin-bottom: 25px;"><a href="http://localhost:3000/verify-email?token=${token}" style="background-color: #E91E63; color: white; text-decoration: none;
             padding: 13px 20px; border-radius: 5px; font-weight: bold;">Verify Email</a></p>
            <p style="font-size: 17px; line-height: 23px;">This link will remain active for 10 minutes. If you did not initiate this request, please ignore this email.</p>
            <span style="    background-color: #E91E63; height: 2px; display: block; width: 100%; border-radius: 5px;"></span>
               <p style="font-size: 17px; line-height: 23px;"> Once verified, you’ll be all set to explore our exclusive collections, enjoy personalized recommendations, and stay updated with the latest trends and offers.
                If you have any questions or need assistance, feel free to reach out to our customer support team.
                We look forward to providing you with an exceptional shopping experience at FashionHub! Thank you for joining us at FashionHub, where fashion meets passion!
            Warm regards, The FashionHub Team</p>
    </div>`
}
module.exports=generateEmailHtml