package com.twilio.chat;

import java.io.BufferedWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.inject.Singleton;

import sarandon.assistance.servlet.more.dataBBDD;

@Singleton
public class TokenServlet extends HttpServlet {
  private final static Logger log = Logger.getLogger(dataBBDD.class);
  private final TwilioTokenCreator tokenCreator;

  @Inject
  public TokenServlet(TwilioTokenCreator tokenCreator) {
    this.tokenCreator = tokenCreator;
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) {
    String identity = request.getParameter("identity");
    String device = request.getParameter("device");

    response.setContentType("application/json");
    
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    response.setHeader("Access-Control-Max-Age", "3600");
    response.setHeader("Access-Control-Allow-Headers", "x-requested-with");
    
    if (identity != null && device != null) {
      // Create an endpoint ID which uniquely identifies the user on their current device
      String appName = "TwilioChatDemo";
      String endpointId = appName + ":" + identity + ":" + device;

      String generatedToken = tokenCreator.generateToken(identity, endpointId);

      Map<String, String> json = new HashMap<>();
      json.put("identity", identity);
      json.put("token", generatedToken);
      renderJson(response, json);
    }

  }

  private void renderJson(HttpServletResponse response, Map<String, String> json) {
    Gson gson = new Gson();
    
    try{
    	response.getWriter().write(gson.toJson(json));
    //try (BufferedWriter responseWriter = new BufferedWriter(response.getWriter())) {
     // responseWriter.write(gson.toJson(json));
     // responseWriter.flush();
    } catch (IOException e) {
       log.error("ERROR en try catch:" + e.getMessage());
      e.printStackTrace();
    }
  }
}
