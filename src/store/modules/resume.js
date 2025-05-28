export const resume = {
  state: () => ({
    resume: {
      name: "",
      city: "",
      birthday: null,
      about: "",
      image: [],
      works: [],
      educations: [],
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

    updateResumeAbout(state, value) {
      state.resume.about = value;
    },

    removeResumeImg(state, index) {
      state.resume.image.splice(index, 1);
    },

    setResumeImg(state, { name, src, type }) {
      state.resume.image.push({
        name: name,
        src: src,
        type: type,
      });
    },

    uploadDataResume(
      state,
      { name, city, birthday, about, works, image, educations }
    ) {
      !!name ? (state.resume.name = name) : "";
      !!city ? (state.resume.city = city) : "";
      !!birthday ? (state.resume.birthday = birthday) : "";
      !!about ? (state.resume.about = about) : "";
      !!works ? (state.resume.works = works) : "";
      !!image ? (state.resume.image = image) : "";
      !!educations ? (state.resume.educations = educations) : "";
    },

    // work
    addResumeWork(state, work) {
      state.resume.works.unshift(work);
    },

    updateResumeWorks(state, works) {
      state.resume.works = works;
    },

    updateResumeWork(state, work) {
      let arr_work = state.resume.works.find((el) => el.id == work.id);

      if (!!arr_work) {
        arr_work.dateStart = work.dateStart;
        arr_work.dateEnd = work.dateEnd;
        arr_work.name = work.name;
        arr_work.until = work.until;
      }
    },

    removeResumeWork(state, id) {
      state.resume.works = state.resume.works.filter((el) => el.id !== id);
    },

    // education
    addResumeEducation(state, education) {
      state.resume.educations.unshift(education);
    },

    updateResumeEducations(state, educations) {
      state.resume.educations = educations;
    },

    updateResumeEducation(state, education) {
      let arr_ed = state.resume.educations.find((el) => el.id == education.id);

      if (!!arr_ed) {
        arr_ed.dateStart = education.dateStart;
        arr_ed.dateEnd = education.dateEnd;
        arr_ed.name = education.name;
        arr_ed.until = education.until;
      }
    },

    removeResumeEducation(state, id) {
      state.resume.educations = state.resume.educations.filter(
        (el) => el.id !== id
      );
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

    getResumeAbout(state) {
      return state.resume.about;
    },

    getResumeWorks(state) {
      return state.resume.works;
    },

    getResumeEducations(state) {
      return state.resume.educations;
    },

    getResumeImg(state) {
      console.log(state.resume);

      return state.resume.image;
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
