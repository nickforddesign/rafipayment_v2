<template>
  <ul>
    <li>
      <router-link to="/dashboard">Dashboard</router-link>
    </li>
    <li>
      <div class="divider" />
    </li>
    <li>
      <router-link to="/companies">Companies</router-link>
    </li>
    <li>
      <router-link to="/superadmins">Superadmins</router-link>
    </li>
    <li>
      <router-link to="/admins">Admins</router-link>
    </li>
    <li>
      <div class="divider" />
    </li>
    <li>
      <legend>Webhooks</legend>
      <ul>
        <li>
          <router-link to="/webhook-subscriptions">Subscriptions</router-link>
        </li>
        <li>
          <router-link to="/webhooks">Events</router-link>
        </li>
      </ul>
    </li>
    <li>
      <div class="divider" />
    </li>
    <li>
      <router-link to="/account">Account</router-link>
    </li>
  </ul>
</template>
