<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">
        Выберите тесто
      </h2>

      <div class="sheet__content dough">
        <label
          v-for="dough in doughs"
          :key="dough.id"
          :class="dough.class"
        >
          <RadioButton
            name="dough"
            class="visually-hidden"
            :value="dough.name"
            :checked="dough.id === pizza.dough.id"
            @handleChoice="setDough"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "../../../common/components/AppRadioButton";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BuilderDoughSelector",

  components: {
    RadioButton,
  },

  computed: {
    ...mapGetters("builder", {
      pizza: "pizza",
      doughs: "doughs",
    }),
  },

  methods: {
    ...mapActions("builder", {
      setPizzaDough: "setDough",
    }),

    setDough(doughName) {
      this.setPizzaDough(doughName);
    },
  },
};
</script>
