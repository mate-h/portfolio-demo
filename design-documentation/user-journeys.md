# User journeys
## User scenario 1
Adam, the head of the HR department at a consulting company would like to schedule an event for a massive holi powder party at their headquarters. Once he has sent out the invitations to a list of emails, he will know with how much holi powder to prepare based on the RSVP of the guests. The party turned out to be great, and he would like to know what to change for next time, so he reads his guests' feedback in the comment section of the event.

> Stories are at the center of the user experience. They put things in context and focus on the ‘holistic’ rather than the ‘artifact’.  

**User story**: As an event organizer, I need to send out invitations so that I can notify the guests for the holi party.  
**User story**: As an event organizer, I need to know who is attending so that I know how much holi powder to buy.  
**User story**: As an event organizer, I want to get feedback from guests so that I know what to change for next time.  

> The priorities for each use case can be defined in the context of this assignment, or (in a real world project) driven by business goals.   

**Use case**:   
Invitation  
Actor: Organizer (admin)  
Steps: Define the event parameters, gather guests contact details, send out invitations to the list of guests  
**Use case**:     
RSVP  
Actor: Guest  
Steps: Receive the invitation, post a response of attentance to the organizer  
**Use case**:   
Attendance statistics  
Actor: Organizer (admin)  
Steps: Based on the feedback of each guest, get up to date information about how many people are attending the event, make a change to the event according to attendance ratio  
**Use case**:  
Leave comment as feedback   
Actor: Guest  
Steps: After the event is over, navigate to to event page, and type in a text field to leave a comment to the organizer by default. Comments may be marked as public for everyone to see, but this content would have to be moderated (see security)  

## User scenario 2
Peter, an long time employee at a consulting company gets invited to a massive holi powder party at their company headquarters. He replies to the invitation email he received in his inbox, without clicking one of the buttons to leave an RSVP. He finds out that there wasn't enough holi powder at the party and then he sends another email to Adam from the previous user scenario about his problem after the event.

**User story**: As a guest, I would like to RSVP to an event by replying to the email so that I don't have to leave my email app.  
**User story**: As a guest, I would like to leave feedback by sending an email to the organizer so that I don't have to learn how to use the comments section in the event page.  

**Use case**:  
RSVP by email  
Actor: Guest  
Steps: Receive invitation, reply to the email to leave an RSVP to the event, which the system sorts and categorizes automatically  

**Use case**:  
Leave comment as feedback by email  
Actor: Guest  
Steps: After the event is over, simply send an email to the event organizer's address to leave a comment about the event, which the system sorts and categorizes automatically. The comments from the comment section and the comments by email should be presented in the same interface for the event organizer.

## User scenario 3 (out of scope)
Jane, the talent manager at a popular studio would like to promote their casting appointments to get as many people to come as she can so she can maximize the candidate pool. She then creates many slots to accept the candidates based on the casting director's availability. Jane is short on time so she would like to hand over managing the event details to her colleague. Since casting is a one on one interview, her collegague has to create many events at different times with the same event name, sent to the candidates individually. 

**User story**: As a talent manager, I want to promote my event I that I can reach a lot of people.  
**User story**: As a talent manager, I want to be able to create events for one on one interviews at different times with the same event name so that I can save time.  
**User story**: As a talent manager, I need to share the time slots with the casting director so that they can prepare accordingly.  

**Use case**:   
Event promotion  
Actor: Organizer (admin)  
Steps: Define the event parameters, and post it directly to social media, which displays a preview for the event that links directly back to the event page  
**Use case**:   
Guest list  
Actor: Visitor  
Steps: Once the prospect lands on the event page, collect their contact information in w eb form to compile the guest list for the event  
**Use case**:  
Event sharing  
Actors: Organizer (admin), Organizer (manager)  
Steps: Define the event parameters, add another organizer with non-administrative role (manager), notification is sent to the additional organizer, they can then add it to their calendar  
**Use case**:  
Calendar integration  
Actors: All organizers, Attendees  
Steps: Once on the event page sent or shared by someone, they can add it to their calendar to remind themselves about the event  

