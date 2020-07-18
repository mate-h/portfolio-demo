## Frontend architecture

**Data layer**  
It is very important to have a good architecture for managing incoming data from the API on the frontend. GraphQL endpoints make this a lot easier, but it is achievable using the pattern proposed by a popular library called Redux.
Implementing a simple store without all the boilerplate that comes with Redux is easy with the help of the React Context API and hooks. With Svelte, this store is built into the library. We can then use Obversables, Epics, Selectors, and other common functional patterns to build our data architecture.

**UI**  
Tailwind CSS helps in building and developing a consistent design system. The components can be extracted during the development process. Themeability is especially important when it comes to supporting different locales, and display modes (dark mode).

## Service design

Separate core business functionalities into services. These can be implemented as microservices in a distributed and scalable architecture with the help of Kubernetes Engine.

## Database design

This is out of scope for this assignment, but designing a relational or document-oriented database for each service would start with narrowing down on the MVP by taking the use cases and their priorities, and drawing the line at a manageable amount of workload.

## Technology stack summary

I won't go into detail as to why I choose these technologies, that belongs in a Technical Recommendation documents, which takes some time to review. These are my personal preferences. Maybe it would be worth the effort to spend time on an integration with a better bundler, such as Snowpack. I am beginning to learn more about Deno, a new javascript, and typescript runtime.

**Frontend architecture**  
I propose to use the Svelte and Sapper frameworks, and Tailwind CSS for the styling solution. Then deploy the Sapper app on the edge using CloudFlare workers, or a good CDN.

**Backend architecture**  
Using NestJS and Typescript, and the power of microservice architecture deployed to Kubernetes.

## Security

### Security Model

The system can adapt the security model of an existing technology solution that has been published in an open-source environment like GitHub and tested by users.

### Authentication & authorization

This section describes how HTTP requests to the API are authenticated and what logic determines whether or not an account is allowed to perform certain actions.
In summary, the client-server authentication scheme is based on well-known and battle-tested protocols. All connections to the API are secured using TLS. Whether an account has read, write or admin permissions are determined by user-defined access rules and enforced with server logic.
The calendar system can implement as many authentication protocols as required by the use cases. Well-known solutions for these are **Auth0** and the **Google Identity Platform**.

### Threat model

This section describes the extensive threat modeling to be performed to identify the objectives and potential vulnerabilities of the system. This allows for deploying effective countermeasures to prevent or mitigate the effects of threats to the system.

Foundational principles:

- Recognize that security through obscurity does not exist, assume an attacker has full access to client and server code and has a deep understanding of the system.
- Never be able to read the user's secrets, so everything is encrypted client-side with keys that the user controls
- Plaintext key material (that could be used to decrypt your secrets) is never sent to the server.
- Follow the very privacy-respecting European law, comply with GDPR. Only a legitimate court order can force the company to cooperate with lawful requests for information. Client-side encryption guarantees that even in such extreme cases the user's secrets are safe.
