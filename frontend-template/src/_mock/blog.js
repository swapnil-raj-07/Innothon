import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const POST_TITLES = [
  {
    id: 1,
    title: 'Use Strong Passwords',
    desc: 'Create complex passwords with a mix of letters, numbers, and symbols. Avoid using easily guessable information like birthdays or common words',
    pointer: 5,
  },
  {
    id: 2,
    title: 'Enable Multi-Factor Authentication (MFA)',
    desc: 'Add an extra layer of security by requiring a second form of verification beyond just a password.',
    pointer: 5,
  },
  {
    id: 3,
    title: 'Regularly Update Software',
    desc: 'Ensure that all operating systems, applications, and security software are up-to-date to protect against vulnerabilities.',
    pointer: 5,
  },
  {
    id: 4,
    title: 'Be Cautious with Email Attachments and Links',
    desc: 'Avoid opening attachments or clicking on links from unknown or unexpected emails, as these could be phishing attempts.',
    pointer: 5,
  },
  {
    id: 5,
    title: 'Secure Your Devices',
    desc: 'Use screen locks, strong passwords, and encryption to protect laptops and mobile devices. Implement automatic device locking when not in use.',
    pointer: 5,
  },
  {
    id: 6,
    title: 'Backup Data Regularly',
    desc: 'Regularly backup important data to an external drive or cloud service to prevent data loss in case of an incident.',
    pointer: 5,
  },
  {
    id: 7,
    title: 'Use a VPN',
    desc: 'When working remotely, use a Virtual Private Network (VPN) to secure your internet connection and protect sensitive data.',
    pointer: 5,
  },
  {
    id: 8,
    title: 'Educate Yourself and Others',
    desc: 'Stay informed about the latest cybersecurity threats and best practices. Participate in training sessions and share knowledge with colleagues.',
    pointer: 5,
  },
  {
    id: 9,
    title: 'Be Wary of Social Engineering',
    desc: 'Be cautious of unsolicited requests for sensitive information and verify the identity of anyone who asks for it.',
    pointer: 5,
  },
  
  {
    id: 10,
    title: 'Implement Strong Authentication',
    desc: 'Use strong authentication methods such as biometrics or hardware tokens to enhance the security of user accounts.',
    pointer: 5,
  },
  {
    id: 11,
    title: 'Monitor Network Traffic',
    desc: 'Regularly monitor network traffic for any suspicious activities or unauthorized access attempts.',
    pointer: 5,
  },
  {
    id: 12,
    title: 'Implement Firewall and Intrusion Detection Systems',
    desc: 'Set up firewalls and intrusion detection systems to protect against unauthorized access and malicious activities.',
    pointer: 5,
  },
  {
    id: 13,
    title: 'Regularly Conduct Security Audits',
    desc: 'Perform regular security audits to identify vulnerabilities and ensure compliance with security standards.',
    pointer: 5,
  },
  {
    id: 14,
    title: 'Secure Web Applications',
    desc: 'Implement secure coding practices and regularly update web applications to prevent common vulnerabilities.',
    pointer: 5,
  },
  {
    id: 15,
    title: 'Encrypt Sensitive Data',
    desc: 'Encrypt sensitive data both at rest and in transit to protect it from unauthorized access.',
    pointer: 5,
  },
  {
    id: 16,
    title: 'Implement Access Controls',
    desc: 'Enforce access controls to limit user privileges and prevent unauthorized access to sensitive resources.',
    pointer: 5,
  },
  {
    id: 17,
    title: 'Train Employees on Security Best Practices',
    desc: 'Provide regular training to employees on security best practices to raise awareness and reduce the risk of human error.',
    pointer: 5,
  },
  {
    id: 18,
    title: 'Regularly Patch and Update Software',
    desc: 'Keep all software and libraries up to date with the latest security patches to address known vulnerabilities.',
    pointer: 5,
  },
  {
    id: 19,
    title: 'Use a Password Manager',
    desc: 'Utilize a password manager to securely store and generate unique passwords for each online account.',
    pointer: 5,
  },
  {
    id: 20,
    title: 'Enable Two-Factor Authentication (2FA)',
    desc: 'Enable two-factor authentication for all your online accounts to add an extra layer of security.',
    pointer: 5,
  },
  {
    id: 21,
    title: 'Secure Your Wi-Fi Network',
    desc: 'Change the default password of your Wi-Fi router and use a strong encryption method to protect your network.',
    pointer: 5,
  },
  {
    id: 22,
    title: 'Beware of Phishing Emails',
    desc: 'Be cautious of emails that ask for personal information or contain suspicious links. Verify the sender before taking any action.',
    pointer: 5,
  },
  {
    id: 23,
    title: 'Keep Your Software Up to Date',
    desc: 'Regularly update your operating system, web browsers, and other software to ensure you have the latest security patches.',
    pointer: 5,
  },
  {
    id: 24,
    title: 'Secure Your Mobile Devices',
    desc: 'Set up a strong passcode or biometric authentication on your mobile devices to prevent unauthorized access.',
    pointer: 5,
  },
  {
    id: 25,
    title: 'Use Secure File Sharing Services',
    desc: 'When sharing sensitive files, use secure file sharing services that encrypt data during transit and at rest.',
    pointer: 5,
  },
  {
    id: 26,
    title: 'Implement Data Loss Prevention (DLP)',
    desc: 'Implement data loss prevention measures to prevent unauthorized access, use, or disclosure of sensitive information.',
    pointer: 5,
  },
  {
    id: 27,
    title: 'Regularly Review Account Activity',
    desc: 'Monitor your online accounts for any suspicious activity or unauthorized access.',
    pointer: 5,
  },
  {
    id: 28,
    title: 'Secure Your Social Media Accounts',
    desc: 'Enable privacy settings, use strong passwords, and be cautious of the information you share on social media platforms.',
    pointer: 5,
  },
  {
    id: 29,
    title: 'Implement Secure Coding Practices',
    desc: 'Follow secure coding practices to prevent common vulnerabilities such as SQL injection and cross-site scripting (XSS).',
    pointer: 5,
  },
  {
    id: 30,
    title: 'Secure Your Cloud Storage',
    desc: 'Use strong passwords and enable encryption for your cloud storage accounts to protect your data.',
    pointer: 5,
  },
  {
    id: 31,
    title: 'Regularly Test and Update Incident Response Plans',
    desc: 'Regularly test and update your incident response plans to ensure an effective response to security incidents.',
    pointer: 5,
  },
  {
    id: 32,
    title: 'Implement Network Segmentation',
    desc: 'Segment your network into separate zones to limit the impact of a security breach and prevent lateral movement.',
    pointer: 5,
  },
  {
    id: 33,
    title: 'Secure Remote Access',
    desc: 'Implement secure remote access methods such as VPNs and multi-factor authentication for remote workers.',
    pointer: 5,
  },
  {
    id: 34,
    title: 'Regularly Monitor and Analyze Logs',
    desc: 'Monitor and analyze system logs to detect and respond to security incidents in a timely manner.',
    pointer: 5,
  },
  {
    id: 35,
    title: 'Implement Least Privilege Principle',
    desc: 'Grant users the minimum level of access required to perform their tasks to minimize the risk of unauthorized actions.',
    pointer: 5,
  },
  {
    id: 36,
    title: 'Regularly Conduct Penetration Testing',
    desc: 'Perform regular penetration testing to identify vulnerabilities and weaknesses in your systems.',
    pointer: 5,
  },
  {
    id: 37,
    title: 'Secure Your Email Communications',
    desc: 'Use encrypted email services and be cautious of sharing sensitive information via email.',
    pointer: 5,
  },
  {
    id: 38,
    title: 'Implement Web Application Firewalls (WAF)',
    desc: 'Set up web application firewalls to protect against common web-based attacks such as SQL injection and cross-site scripting (XSS).',
    pointer: 5,
  },
  {
    id: 39,
    title: 'Secure Your IoT Devices',
    desc: 'Change default passwords, update firmware, and isolate IoT devices from your main network to enhance security.',
    pointer: 5,
  },
  {
    id: 40,
    title: 'Regularly Review and Update Security Policies',
    desc: 'Review and update your organization\'s security policies to address emerging threats and ensure compliance.',
    pointer: 5,
  },
  {
    id: 41,
    title: 'Implement File Integrity Monitoring (FIM)',
    desc: 'Monitor file integrity to detect unauthorized changes or modifications to critical system files.',
    pointer: 5,
  },
  {
    id: 42,
    title: 'Secure Your Database',
    desc: 'Implement strong access controls, encrypt sensitive data, and regularly patch and update your database systems.',
    pointer: 5,
  },
  {
    id: 43,
    title: 'Regularly Train Employees on Phishing Awareness',
    desc: 'Provide regular training to employees on how to identify and report phishing attempts.',
    pointer: 5,
  },
  {
    id: 44,
    title: 'Implement Secure Remote Desktop Protocol (RDP)',
    desc: 'Secure remote desktop connections with strong authentication and encryption methods.',
    pointer: 5,
  },
  {
    id: 45,
    title: 'Secure Your DNS Infrastructure',
    desc: 'Implement DNS security measures such as DNSSEC and DNS filtering to protect against DNS-based attacks.',
    pointer: 5,
  },
  {
    id: 46,
    title: 'Regularly Monitor and Update Security Hardware',
    desc: 'Monitor and update security hardware such as firewalls and intrusion detection systems to ensure optimal protection.',
    pointer: 5,
  },
  {
    id: 47,
    title: 'Implement Secure Software Development Lifecycle (SDLC)',
    desc: 'Follow secure software development practices throughout the entire software development lifecycle.',
    pointer: 5,
  },
  {
    id: 48,
    title: 'Secure Your Physical Workspace',
    desc: 'Implement physical security measures such as access controls and surveillance systems to protect your workspace.',
    pointer: 5,
  },
  {
    id: 49,
    title: 'Regularly Review and Update Backup and Recovery Plans',
    desc: 'Review and update your backup and recovery plans to ensure the availability and integrity of your data.',
    pointer: 5,
  },
  {
    id: 50,
    title: 'Implement Security Information and Event Management (SIEM)',
    desc: 'Implement SIEM solutions to centralize and analyze security event logs for proactive threat detection.',
    pointer: 5,
  }
];

const READ_NOTIFICATION_ID = [1,4,6,8,9,50,23,11,22,25,32,10]


export const posts = POST_TITLES.map((post, index) => ({
  id: post.id,
  cover: `/assets/images/covers/cover_${(index % 24) + 1}.jpg`,
  title: post.title,
  desc: post.desc,
  pointer: 5,
  isRead: READ_NOTIFICATION_ID.includes(post.id),
  createdAt: faker.date.past(),
  pointer: post.pointer,
  author: {
    name: faker.person.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${(index % 24) + 1}.jpg`,
  },
})).sort((a, b) => {
  if (a.isRead && !b.isRead) return 1;
  if (!a.isRead && b.isRead) return -1;
  if (a.createdAt > b.createdAt) return -1;
  if (a.createdAt < b.createdAt) return 1;
  return 0;
});
