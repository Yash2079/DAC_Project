package com.example.demo.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class EmailController {

    @Autowired
    private EmailService emailService;

    // Method to send a simple email
    @PostMapping("/sendMail")
    public ResponseEntity<String> sendMail(@RequestBody EmailDetails details) {
        System.out.println(details);
        String status = emailService.sendSimpleMail(details);
        return ResponseEntity.ok(status);
    }

    // Method to send an email with an attachment
    @PostMapping("/sendMailWithAttachment")
    public ResponseEntity<String> sendMailWithAttachment(
            @RequestPart("details") EmailDetails details,
            @RequestPart("file") MultipartFile file) {

        // Call the service to send email with attachment
        String status = emailService.sendMailWithAttachment(details, file);

        if (status.equals("Mail Sent Successfully...")) {
            return ResponseEntity.ok(status);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(status);
        }
    }
}