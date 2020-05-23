const request = require("supertest");
const db = require("../database/dbConfig");
const express = require("express");
const server = require("../api/server");
const Users = require("./users-model");
const Jokes = require("../jokes/jokes-router");

describe("auth", () => {
  const newUser1 = { username: "LisaPizza", password: "PizzaPassword" };
  const newUser2 = { username: "BigLisaPizza", password: "BigPizzaPassword" };

  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("registration", () => {
    test("should return the username just created", async () => {
      return await request(server)
        .post("/api/auth/register")
        .send(newUser1)
        .then(res => {

          expect(res.body.username).toBe(newUser1.username)
        });
    });
    test("should return status (201)", async () => {
      return await request(server)
        .post("/api/auth/register")
        .send(newUser1)
        .then(res => expect(res.status).toBe(201));
    });
  });

  describe("login test", () => {
    beforeEach(async () => {
      await request(server)
      .post('/api/auth/register')
      .send(newUser2)
    });

    test("should return a (200) status", async () => {
      await request(server)
      .post("/api/auth/login")
      .send(newUser2)
      .then(res => expect(res.status).toBe(200));
    });
    test("should return a token", async () => {
      await request(server)
      .post("/api/auth/login")
      .send(newUser2)
      .then(res => expect(res.body.token).toBeTruthy());
    });
  });
});
