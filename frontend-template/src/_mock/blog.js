import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const POST_TITLES = [
    'Phishing Attacks: How to Protect Yourself',
    'Ransomware: The Growing Threat',
    'Data Breaches: Lessons Learned',
    'Social Engineering: Manipulating Human Behavior',
    'Malware: Types and Prevention',
    'Password Security: Best Practices',
    'Network Vulnerabilities: Identifying Weak Points',
    'Mobile Device Security: Protecting Your Data',
    'Cloud Security: Ensuring Data Privacy',
    'IoT Security: Securing the Internet of Things',
    'Cybersecurity Compliance: Meeting Regulatory Requirements',
    'Insider Threats: Protecting Against Internal Attacks',
    'Cybersecurity Awareness Training: Educating Your Team',
    'Data Encryption: Safeguarding Sensitive Information',
    'Phishing Awareness: Spotting Fake Emails',
    'Cybersecurity Incident Response: Handling Breaches',
    'Web Application Security: Preventing Attacks',
    'Endpoint Security: Securing Devices',
    'Wireless Network Security: Protecting Wi-Fi Networks',
    'Cybersecurity Audits: Assessing Your Security Measures',
    'Identity Theft: Protecting Personal Information',
    'Cybersecurity Policies: Establishing Best Practices',
    'Secure Coding: Writing Secure Software',
    'Cybersecurity Risk Assessment: Identifying Threats',
    'Security Patch Management: Keeping Systems Up to Date',
  ];


export const posts = [...Array(100)].map((_, index) => ({
  id: faker.string.uuid(),
  cover: `/assets/images/covers/cover_${(index % 24) + 1}.jpg`,
  title: POST_TITLES[(index%POST_TITLES.length)],
  createdAt: faker.date.past(),
  pointer: faker.number.int(9).toString().concat(0),
  author: {
    name: faker.person.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${(index % 24) + 1}.jpg`,
  },
}));
