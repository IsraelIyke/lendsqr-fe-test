export interface User {
  id: string;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
  accountBalance: string;
  accountNumber: string;
  bankName: string;
  userTier: number;
  profile: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    avatar: string;
    gender: string;
    bvn: string;
    address: string;
    maritalStatus: string;
    children: string;
    typeOfResidence: string;
  };
  guarantor: {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  };
  socials: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  education: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: string[];
    loanRepayment: string;
  };
}
