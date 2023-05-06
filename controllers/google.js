import express from "express";
import { google } from "googleapis";
import jwt from "jsonwebtoken";

const CLIENT_ID =
  "354507874142-d3fj22u2pqh8gs8mfvl8m7vs9n0t8es3.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URL = "http://localhost:3001";

const client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

export const saveToken = async (req, res) => {
  const { code } = req.body;
  try {
    const { tokens } = await client.getToken(code);
    res.json({
      status: 200,
      tokens
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to exchange authorization code for tokens");
  }
};
