package com.example.demo.email;

public class EmailDetails {
    private String recipient;
    private String subject;
    private String messageBody;
    private String attachment; // This could be a path to the file or any other necessary data

    // Default constructor
    public EmailDetails() {}

    // Parameterized constructor
    public EmailDetails(String recipient, String subject, String messageBody, String attachment) {
        this.recipient = recipient;
        this.subject = subject;
        this.messageBody = messageBody;
        this.attachment = attachment;
    }

    // Getters and Setters
    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessageBody() {
        return messageBody;
    }

    public void setMessageBody(String messageBody) {
        this.messageBody = messageBody;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    @Override
    public String toString() {
        return "EmailDetails{" +
                "recipient='" + recipient + '\'' +
                ", subject='" + subject + '\'' +
                ", messageBody='" + messageBody + '\'' +
                ", attachment='" + attachment + '\'' +
                '}';
    }
}