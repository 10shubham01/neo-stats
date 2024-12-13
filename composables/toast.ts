type ToastType = 'SUCCESS' | 'ERROR' | 'INFO';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

const toasts = ref<Toast[]>([]);

export function useToast() {
  const raiseToast = (message: string, type: ToastType = 'ERROR', duration = 3000) => {
    const id = String(crypto.randomUUID());
    const toast: Toast = { id, message, type, duration };
    toasts.value.push(toast);
    setTimeout(() => removeToastById(id), duration);
  };

  const removeToast = (index: number) => {
    toasts.value.splice(index, 1);
  };

  function removeToastById(id: string) {
    toasts.value = toasts.value.filter(toast => toast.id !== id);
  };

  return { toasts: computed(() => toasts.value), raiseToast, removeToast };
}
