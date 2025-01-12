<template>
  <form
    action="#"
    method="post"
    class="address-form address-form--opened sheet"
    @submit.prevent
  >
    <div class="address-form__header">
      <b>Адрес {{ number }}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <label class="input">
          <span>Название адреса*</span>
          <input
            v-model="editAddress.name"
            type="text"
            name="name"
            placeholder="Введите название адреса"
            required
          >
        </label>
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <label class="input">
          <span>Улица*</span>
          <input
            v-model="editAddress.street"
            type="text"
            name="street"
            placeholder="Введите название улицы"
            required
          >
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Дом*</span>
          <input
            v-model="editAddress.building"
            type="text"
            name="house"
            placeholder="Введите номер дома"
            required
          >
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Квартира</span>
          <input
            v-model="editAddress.flat"
            type="text"
            name="apartment"
            placeholder="Введите № квартиры"
          >
        </label>
      </div>
      <div class="address-form__input">
        <label class="input">
          <span>Комментарий</span>
          <input
            v-model="editAddress.comment"
            type="text"
            name="comment"
            placeholder="Введите комментарий"
          >
        </label>
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        type="button"
        class="button button--transparent"
        @click="remove"
      >
        Удалить
      </button>
      <button
        type="submit"
        class="button"
        @click="submit"
      >
        Сохранить
      </button>
    </div>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import validator from "../mixins/validator";
import resources from "../enums/resources";
import { AddressValidations } from "../const/validation";
import { DefaultAddress, Message } from "../const/common";
import { getValidationErrorMessage } from "../utils/helpers/validation";

export default {
  name: "AppAddressForm",

  mixins: [validator],

  props: {
    address: {
      type: Object,
      default: () => DefaultAddress,
    },
    number: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      validations: { ...AddressValidations },
      editAddress: { ...this.address },
    };
  },

  computed: {
    ...mapGetters({
      user: "auth/getUser",
    }),
  },

  methods: {
    getAddress() {
      return this.user
        ? { ...this.editAddress, userId: this.user.id }
        : this.editAddress;
    },

    async submit() {
      if (
        !this.$validateFields(
          {
            name: this.editAddress.name,
            street: this.editAddress.street,
            building: this.editAddress.building,
          },
          this.validations
        )
      ) {
        const errorMessage = getValidationErrorMessage(this.validations);
        this.$notifier.error(errorMessage);
        return;
      }

      const notify = {
        status: "error",
        message: Message.SERVER_ERROR,
      };

      if (this.editAddress.id) {
        try {
          await this.$api[resources.ADDRESSES].put(this.editAddress);
          notify.status = "success";
          notify.message = Message.ADDRESS_EDIT_SUCCESS;
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          const address = this.getAddress();
          await this.$api[resources.ADDRESSES].post(address);
          notify.status = "success";
          notify.message = Message.ADDRESS_ADD_SUCCESS;
        } catch (e) {
          console.log(e);
        }
      }

      this.$notifier[notify.status](notify.message);
      this.$emit("closeForm");
    },

    async remove() {
      if (this.address.id) {
        await this.$api[resources.ADDRESSES].delete(this.address.id);
      }
      this.$emit("closeForm");
    },
  },
};
</script>
