import dayjs from "dayjs";

export class LocalStorage {
  static getDob(): string | null {
    const dob = localStorage.getItem("dob") || "";

    if (dayjs(dob).isValid()) {
      return dob;
    }

    return null;
  }

  static setDob(dob: string) {
    localStorage.setItem("dob", dob);
  }
}
