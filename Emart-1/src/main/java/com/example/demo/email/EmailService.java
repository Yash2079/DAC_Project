package com.example.demo.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    // Method to send a simple mail
    public String sendSimpleMail(EmailDetails details) {
        // Implementation for sending simple email
        // ...
        return "Mail Sent Successfully...";
    }

    // Method to send an email with attachment
    public String sendMailWithAttachment(EmailDetails details, MultipartFile file) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setSubject(details.getSubject());
            mimeMessageHelper.setText(details.getMessageBody());

            // Adding the attachment
            InputStreamSource attachmentSource = file::getInputStream;
            mimeMessageHelper.addAttachment(file.getOriginalFilename(), attachmentSource);

            // Send the email
            javaMailSender.send(mimeMessage);
            return "Mail Sent Successfully...";

        } catch (MessagingException e) {
            e.printStackTrace();
            System.out.println("Error while sending email: " + e.getMessage());
            return "Error while sending mail!!!";
        }
    }
}