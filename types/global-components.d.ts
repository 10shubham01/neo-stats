import type VueTailwindDatepicker from 'vue-tailwind-datepicker';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    DatePicker: typeof VueTailwindDatepicker;
  }
}

export {};
