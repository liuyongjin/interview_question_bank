import { BaseForm } from '@/component'

const shcema = {
  properties: {
    NAME: {
      label: '123',
      widget: {
        component: 'OutlinedInput'
      },
      // default: ''
    }
  },
  ui: {

  }
}

export default function Home() {

  return (
    <main className="min-h-screen">
      <BaseForm shcema={shcema} />
    </main>
  );
}
