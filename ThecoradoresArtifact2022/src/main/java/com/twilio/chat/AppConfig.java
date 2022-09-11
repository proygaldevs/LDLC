package com.twilio.chat;

import java.util.Arrays;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class AppConfig {

  private final Map<EnvironmentVariable, Optional<String>> configurations;

  public AppConfig() {
    Stream<EnvironmentVariable> stream = Arrays.stream(EnvironmentVariable.values());
    this.configurations = stream.collect(Collectors.toMap(Function.identity(),
        v -> Optional.ofNullable(System.getenv(v.toString()))));
  }

  /*String getTwilioIPMServiceSID() {
	    return configurations.get(EnvironmentVariable.TWILIO_IPM_SERVICE_SID).orElse("");
	  }

	  String getTwilioAPISecret() {
	    return configurations.get(EnvironmentVariable.TWILIO_API_SECRET).orElse("");
	  }

	  String getTwilioAPIKey() {
	    return configurations.get(EnvironmentVariable.TWILIO_API_KEY).orElse("");
	  }

	  String getTwilioAccountSID() {
	    return configurations.get(EnvironmentVariable.TWILIO_ACCOUNT_SID).orElse("");
	  }
*/
	  
	  String getTwilioIPMServiceSID() {
		    return "ISa0c871b86a9044a5a0af1d39e2a10451";
		  }

		  String getTwilioAPISecret() {
		    return "dbJQsUVdcwHr0hlm4j3z9SAzDx7kwTi8";
		  }

		  String getTwilioAPIKey() {
		    return "SKa902f2f1b53e43c5f5cc8a54f784d8fc";
		  }

		  String getTwilioAccountSID() {
		    return "AC2a81ad723337c5772ced6b06433e7c82";
		  }

		  
		  
  public boolean isIncomplete() {
	  return false;
   // return configurations.values().stream().anyMatch(value -> !value.isPresent());
  }

  @Override
  public String toString() {
    return configurations.toString();
  }

  enum EnvironmentVariable {
    TWILIO_IPM_SERVICE_SID, TWILIO_API_SECRET, TWILIO_API_KEY, TWILIO_ACCOUNT_SID
  }
}
