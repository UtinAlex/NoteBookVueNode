 
<template>
  <div class="document-inputs">
    <v-app>
      <v-form
        ref="form"
        lazy-validation
        v-model="valid"
        @submit.prevent="submitForm"
      >
        <div class="form-wrapper">
          <div>
            <v-textarea
              solo
              hide-details
              auto-grow
              label="Имя"
              rows="1"
              v-model="name"
            ></v-textarea>
          </div>

          <div>
            <v-textarea
              solo
              hide-details
              auto-grow
              label="номер телефона"
              rows="1"
              v-model="tel"
            ></v-textarea>
          </div>

          <v-btn
            type="submit"
            :disabled="!valid"
            block
            large
            color="#0dab76"
            @click="validate"
            >{{ btnText }}</v-btn
          >
        </div>
      </v-form>
    </v-app>
  </div>
</template>

<script>
export default {
  // props необходим только при изменении записи
  props: ["upid", "upname", "uptel"],
  data() {
    return {
      btnText: "Добавить запись",
      name: "",
      tel: 0,
      id: 0,
      valid: true,
    };
  },
  mounted() {
    //console.log("CreateComponent mounted.");
  },
  methods: {
    up(id, name, tel) {
      this.id = id;
      this.name = name;
      this.tel = tel;
      this.btnText = "Изменить запись";
      //console.log('Up');
    },

    validate() {
      this.$refs.form.validate();
    },

    submitForm() {
      // console.log(this.id);
      if (this.id) {
        this.axios
          .patch(`http://127.0.0.1:3000/book/${this.id}`, {
            name: this.name,
            telephone: this.tel,
          })
          .then(() => {
            window.location.href = "http://127.0.0.1:8080/";
          });
      } else {
        this.axios
          .post("http://127.0.0.1:3000/book", {
            name: this.name,
            telephone: this.tel,
          })
          .then((response) => {
            console.log(response.data);

            window.location.href = "http://127.0.0.1:8080/";
          });
      }
    },
  },
};
</script>

<style lang="scss">
.document-inputs {
  margin: 0 auto;
  width: 30%;
  // margin-left: 30px;
  margin-top: 30px;
}

.form-wrapper {
  width: 100%;
  padding: 10px;
  background-color: #364a54;
  // border: 2px solid black;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  textarea {
    resize: none;
  }
  button {
    margin-top: 5px;
  }
  .v-input {
    margin-top: 5px;
  }

  & > div {
    margin-bottom: 20px;
  }
}
</style>
