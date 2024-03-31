export const resume = {
  state: () => ({
    resume: {
      name: "",
      city: "",
      birthday: null,
    },
  }),

  mutations: {
    updateResumeName(state, value) {
      state.resume.name = value;
    },

    updateResumeCity(state, value) {
      state.resume.city = value;
    },

    updateResumeBirthday(state, value) {
      state.resume.birthday = value;
    },

    uploadDataResume(state, { name, city, birthday }) {
      name ? (state.resume.name = name) : "";
      city ? (state.resume.city = city) : "";
      birthday ? (state.resume.birthday = birthday) : "";
    },
  },

  getters: {
    getResumeName(state) {
      return state.resume.name;
    },

    getResumeCity(state) {
      return state.resume.city;
    },

    getResumeBirthday(state) {
      return state.resume.birthday;
    },

    getResumeJson(state) {
      return { resume: state.resume };
    },

    getAge(state) {
      if (!!state.resume.birthday) {
        let now = new Date(); //Текущя дата
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени

        let birthday = new Date(state.resume.birthday); //Дата рождения
        let dobnow = new Date(
          today.getFullYear(),
          birthday.getMonth(),
          birthday.getDate()
        ); //ДР в текущем году

        let age = today.getFullYear() - birthday.getFullYear();
        //Если ДР в этом году ещё предстоит, то вычитаем из age один год
        if (today < dobnow) {
          age = age - 1;
        }

        let lastLetter = String(age).charAt(String(age).length - 1);
        let result = age;

        if (
          lastLetter == "5" ||
          lastLetter == "6" ||
          lastLetter == "7" ||
          lastLetter == "8" ||
          lastLetter == "9" ||
          lastLetter == "0" ||
          age == 11 ||
          age == 12 ||
          age == 13 ||
          age == 14
        ) {
          result += " лет";
        } else {
          if (lastLetter == "1") {
            result += " год";
          } else {
            if (lastLetter == "2" || lastLetter == "3" || lastLetter == "4") {
              result += " года";
            }
          }
        }

        return result;
      } else {
        return "";
      }
    },
  },
};
