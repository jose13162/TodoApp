import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { $axios, $cookies } from "~/utils/nuxt-instance";

type Token = string | null;

interface CreatePayload {
  email: string;
  password: string;
}

@Module({ name: "users/auth", stateFactory: true, namespaced: true })
export default class Auth extends VuexModule {
  private token = null as Token;

  public get $token() {
    return this.token;
  }

  @Mutation
  private UPDATE_TOKEN(token: Token) {
    this.token = token;
  }

  @Action({ rawError: true })
  public async create(payload: CreatePayload) {
    const { token } = await $axios.$post("/auth", payload);

    $cookies.set("token", token, {
      path: "/",
    });

    this.context.commit("UPDATE_TOKEN", token);
  }
}
