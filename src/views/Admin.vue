<template>
  <div class="container">
    <h2>List of users in the system</h2>
    <div class="button-container">
      <a-button type="primary" @click="goToAdminControllere">
        เพิ่มผู้ใช้
      </a-button>
    </div>
    <a-table :columns="columns" :data-source="userData">
      <template #headerCell="{ column }">
        <template v-if="column.key === '#'">
          <div class="table-header-index">#</div>
        </template>
      </template>
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === '#'">
          <div class="table-body-index">
            {{ index + 1 }}
          </div>
        </template>
        <template v-else-if="column.key === 'userType'">
          <span>
            <a-tag :color="record.userType === '1' ? 'red' : 'green'">
              <span>{{ record.userType === "1" ? "Admin" : "Member" }}</span>
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-col class="table-body-action">
            <a-button @click="goToEditUserById(record.userID)">edit</a-button>
            <a-button @click="deleteUserById(record.userID, record.username)" danger>delete</a-button>
          </a-col>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { request } from "../../axios-config";
import Swal from "sweetalert2";

export default {
  name: "ListUser",
  data() {
    return {
      userData: [],
      columns: [
        {
          title: "",
          dataIndex: "",
          key: "",
        },
        {
          title: "username",
          dataIndex: "username",
          key: "username",
        },
        {
          title: "role",
          dataIndex: "userType",
          key: "userType",
        },
        {
          title: "manage",
          key: "action",
          dataIndex: "action",
        },
      ],
    };
  },
  methods: {
    goToCreateUserPage() {
      this.$router.push("/create-user");
    },

    goToEditUserById(userId) {
      this.$router.push(`/edit-user/${userId}`);
    },

    async deleteUserById(userId, username) {
      Swal.fire({
        title: "warning!",
        text: `Do you want to delete your username ${username}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "confirm",
        cancelButtonText: "cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await request.delete(`/user/${userId}`);
            if (response.status === 200) {
              Swal.fire({
                title: "delete succsess!",
                text: `delete user ${username} succsess`,
                icon: "success",
                confirmButtonText: "confirm",
              });
              this.fetchUserData();
            }
          } catch (err) {
            Swal.fire({
              title: "An error occurred!",
              text: "An error occurred deleting the user",
              icon: "error",
              confirmButtonText: "confirm",
            });
          }
        }
      });
    },

    async fetchUserData() {
      try {
        const response = await request.get("/user");
        this.userData = response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
  },
  created() {
    this.fetchUserData();
  },
};
</script>

<style scoped>
.container {
  border-radius: 8px;
  background: #fff;
  padding: 40px;
}
.button-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
}
.table-header-index {
  /* width: 100px; */
  /* display: flex; */
  justify-content: center;
  align-items: center;
}
.table-body-index {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.table-body-action {
  width: 130px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>