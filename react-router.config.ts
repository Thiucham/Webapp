import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  appDirectory: "src",
  basename: "/Webapp/",

  async prerender() {
    const collections = [
      { name: "Luisan", count: 200 },
      { name: "Hiuna-Khomlui", count: 302 },
      { name: "Khristen-Madui-Lui", count: 448 },
    ];
    const paths = ["/", "/app", "/app/sign-in"];

    for (const { name, count } of collections) {
      paths.push(`/app/${name}/AllList`);
      for (let i = 1; i <= count; i++) {
        paths.push(`/app/${name}/AllList/${i}`);
      }
    }

    return paths;
  },
} satisfies Config;
