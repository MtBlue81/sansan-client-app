export type UserInfo = {
  id: string;
  name: string;
  userType: 'RegularUser' | 'SystemAdministrator' | 'SectionalAdministrator';
  canUpdateData: boolean;
  departments: { name: string }[];
};

export const createDummy = (data: Partial<UserInfo> = {}) => ({
  id: "ito",
  name: "伊藤花子",
  userType: "SystemAdministrator",
  canUpdateData: true,
  departments: [
    {
      name: "営業部"
    }
  ],
  ...data,
});
