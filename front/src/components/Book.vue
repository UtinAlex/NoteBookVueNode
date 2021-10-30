<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="6">
        <div>
          <br />

          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Поиск записи"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="desserts"
              :items-per-page="10"
              :search="search"
            >
              <template v-slot:item="props">
                <tr>
                  <td>{{ props.item._id }}</td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.telephone }}</td>
                  <td>
                    <v-btn
                      icon
                      class="mx-0"
                      @click="
                        update(
                          props.item._id,
                          props.item.name,
                          props.item.telephone
                        )
                      "
                    >
                      <v-icon large color="#34b4ff" title="Изменить запись"
                        >mdi-pencil</v-icon
                      >
                    </v-btn>
                    <v-btn icon class="mx-0" @click="remove(props.item._id)">
                      <v-icon large color="#FE7171" title="Удалить запись"
                        >mdi-delete</v-icon
                      >
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </div>
      </v-col>

      <Create
        :upid="upid"
        :upname="upname"
        :uptel="uptel"
        ref="childComponent"
      />
    </v-row>
  </v-container>
</template>

<script>
import Create from "./Create";

export default {
  components: {
    Create,
  },

  data() {
    return {
      upid: 0,
      upname: "",
      uptel: 0,

      search: "",
      headers: [
        { text: "ID", value: "_id" },
        { text: "Имя", value: "name" },
        { text: "Телефон", value: "telephone" },
      ],
      desserts: [],
    };
  },
  mounted() {
    this.getRecordings();
    this.changePageTitle();
  },
  methods: {
    getRecordings() {
      this.axios
        .get("http://127.0.0.1:3000/books")
        .then((response) => {
          for (let item of response.data) {
            // console.log(item);
            this.desserts.push(item);
            //console.log(this.desserts);
          }
        })
        .catch((error) => {
          throw error;
        });
    },

    update(id, name, tel) {
      this.upid = id;
      this.upname = name;
      this.uptel = tel;
      //устанавливаем текущие значения в форму
      this.$refs.childComponent.up(id, name, tel);
    },
    remove(id) {
      if (confirm("Вы уверенны что хотите удалить запись?")) {
        this.axios
          .delete(`http://127.0.0.1:3000/book/${id}`, {})
          .then(() => {
            this.desserts = [];
            this.getRecordings();
          })
          .catch((error) => {
            throw error;
          });
      }
    },
    changePageTitle() {
      document.title = "Записная книжка";
    },
  },
};
</script>
