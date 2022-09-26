package sarandon.assistance.servlet.more;
import java.awt.image.BufferedImage;
/*
 * Copyright 2010-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.net.URI;
import java.net.URL;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.apache.tomcat.util.codec.binary.Base64;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.auth.profile.ProfilesConfigFile;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.devicefarm.model.ListArtifactsRequest;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ListObjectsRequest;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectSummary;


/**
 *ESta clase hace lo mismo que S3Sample, pero sin guardar ni recuperar de la BBDD
 */
public class S3AndBbdd {
	private final static Logger log = Logger.getLogger(dataBBDD.class);
	 public static AWSCredentials credentials = null;
	 String bucketNameDefault = new Config().bucket_name;
	 String bucketName = new Config().bucket_name;
   

	
	
	
    public int  deleteFile( String path, String fichero) { 
         log.info("deletefile with Amazon S3"); 
    	try {
        	if(credentials==null){
        		ProfilesConfigFile p= new ProfilesConfigFile(path);
                credentials = new ProfileCredentialsProvider(p,"default").getCredentials();
        	}
        	
        } catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
            throw new AmazonClientException(
                    "Cannot load the credentials from the credential profiles file. " +
                    "Please make sure that your credentials file is at the correct " +
                    "location (C:\\Users\\Sarandon\\.aws\\credentials), and is in valid format.",
                    e);
        }
		ObjectListing objects= new ObjectListing();
		try{
			 AmazonS3 _client = new AmazonS3Client(credentials);
			 _client.deleteObject(new DeleteObjectRequest(bucketNameDefault, fichero));
			   
		}catch (Exception e) {
			// TODO: handle exception
			return -1;
		}
		
	    return 0;
		
	}
    public  List<S3ObjectSummary> listFilesInFolder( String prefix, String path) {
    	log.info("S3AndBbdd listFilesInFolder");  
    	try {
        	if(credentials==null){
        		ProfilesConfigFile p= new ProfilesConfigFile(path);
                credentials = new ProfileCredentialsProvider(p,"default").getCredentials();
        	}
        	
        } catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
            throw new AmazonClientException(
                    "Cannot load the credentials from the credential profiles file. " +
                    "Please make sure that your credentials file is at the correct " +
                    "location (C:\\Users\\Sarandon\\.aws\\credentials), and is in valid format.",
                    e);
        }
		ObjectListing objects= new ObjectListing();
		try{
			 AmazonS3 _client = new AmazonS3Client(credentials);
			    String delimiter = "/";
			    if (!prefix.endsWith(delimiter)) {
			        prefix += delimiter;
			    }

			    ListObjectsRequest listObjectsRequest = new ListObjectsRequest()
			            .withBucketName(bucketNameDefault).withPrefix(prefix)
			            .withDelimiter(delimiter);
			     objects = _client.listObjects(listObjectsRequest);
		}catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			// TODO: handle exception
		}
		
	    return objects.getObjectSummaries();
		
	}
	
	public List<String> listFolders( String prefix, String path) {
    	log.info("S3AndBbdd listFolders"); 
		try {
        	if(credentials==null){
        		ProfilesConfigFile p= new ProfilesConfigFile(path);
                credentials = new ProfileCredentialsProvider(p,"default").getCredentials();
        	}
        	
        } catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
            throw new AmazonClientException(
                    "Cannot load the credentials from the credential profiles file. " +
                    "Please make sure that your credentials file is at the correct " +
                    "location (C:\\Users\\Sarandon\\.aws\\credentials), and is in valid format.",
                    e);
        }

		 AmazonS3 _client = new AmazonS3Client(credentials);
	    String delimiter = "/";
	    if (!prefix.endsWith(delimiter)) {
	        prefix += delimiter;
	    }

	    ListObjectsRequest listObjectsRequest = new ListObjectsRequest()
	            .withBucketName(bucketNameDefault).withPrefix(prefix)
	            .withDelimiter(delimiter);
	    ObjectListing objects = _client.listObjects(listObjectsRequest);
	    return objects.getCommonPrefixes();
	}


    

    public String insertarFicheroS3(InputStream content,String path,String key){
    	log.info("S3AndBbdd insertarFicheroS3");
        try {
        	if(credentials==null){
        		ProfilesConfigFile p= new ProfilesConfigFile(path);
                credentials = new ProfileCredentialsProvider(p,"default").getCredentials();
        	}
        	
        } catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
            throw new AmazonClientException(
                    "Cannot load the credentials from the credential profiles file. " +
                    "Please make sure that your credentials file is at the correct " +
                    "location (C:\\Users\\Sarandon\\.aws\\credentials), and is in valid format.",
                    e);
        }
       // String bucketName = "decotheco-thecoradores";

        
        AmazonS3 s3 = new AmazonS3Client(credentials);
        Region usWest2 = Region.getRegion(Regions.EU_WEST_1);
        s3.setRegion(usWest2);
        
 

        try {
            
        	InputStream i= content;
        	byte[] resultByte = DigestUtils.md5(content);
        	String streamMD5 = new String(Base64.encodeBase64(resultByte));
        	
        	

        	
        	ObjectMetadata meta = new ObjectMetadata();
        	ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(resultByte);
        	meta.setContentLength(IOUtils.toByteArray(byteArrayInputStream).length);
        	meta.setContentMD5(streamMD5);
    		
        	
        	
    		s3.putObject(new PutObjectRequest(bucketName,  key, new ByteArrayInputStream(resultByte), meta).withCannedAcl(CannedAccessControlList.PublicRead));
    

            
            
        } catch (AmazonServiceException ase) {
			log.error("ERROR en try catch:" + ase.getMessage());
            log.error("Caught an AmazonServiceException, which means your request made it "
                    + "to Amazon S3, but was rejected with an error response for some reason.");
            log.error("Error Message:    " + ase.getMessage());
            log.error("HTTP Status Code: " + ase.getStatusCode());
            log.error("AWS Error Code:   " + ase.getErrorCode());
            log.error("Error Type:       " + ase.getErrorType());
            log.error("Request ID:       " + ase.getRequestId());
        } catch (AmazonClientException ace) {
			log.error("ERROR en try catch:" + ace.getMessage());
            log.error("Caught an AmazonClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with S3, "
                    + "such as not being able to access the network.");
            log.error("Error Message: " + ace.getMessage());
        }catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
            log.error("Caught an AmazonClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with S3, "
                    + "such as not being able to access the network.");
            log.error("Error Message: " + e.getMessage());
        }
        return s3.getUrl(bucketName, key).toString();
    }

    		
    		
    public String insertarFicheroS3png(BufferedImage f,String path,String key){
    	log.info("S3AndBbdd insertarFicheroS3png");
    	
        try {
        	if(credentials==null){
        		ProfilesConfigFile p= new ProfilesConfigFile(path);
                credentials = new ProfileCredentialsProvider(p,"default").getCredentials();
        	}
        	
        } catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
            throw new AmazonClientException(
                    "Cannot load the credentials from the credential profiles file. " +
                    "Please make sure that your credentials file is at the correct " +
                    "location (C:\\Users\\Sarandon\\.aws\\credentials), and is in valid format.",
                    e);
        }
       // String bucketName = "decotheco-thecoradores";

        
        AmazonS3 s3 = new AmazonS3Client(credentials);
        Region usWest2 = Region.getRegion(Regions.EU_WEST_1);
        s3.setRegion(usWest2);
        

        log.info("===========================================");
        log.info("Getting Inserting Buffer with Amazon S3");
        log.info("===========================================\n");

        try {
            
        	ByteArrayOutputStream os = new ByteArrayOutputStream();
    		ImageIO.write(f, "png", os);
    		byte[] buffer = os.toByteArray();
    		InputStream is = new ByteArrayInputStream(buffer);
    		
    		
    		
    		ObjectMetadata meta = new ObjectMetadata();
    		meta.setContentLength(buffer.length);
    		s3.putObject(new PutObjectRequest(bucketName,  key, is, meta).withCannedAcl(CannedAccessControlList.PublicRead));
    

            
            
        } catch (AmazonServiceException ase) {
			log.error("ERROR en try catch:" + ase.getMessage());
            log.error("Caught an AmazonServiceException, which means your request made it "
                    + "to Amazon S3, but was rejected with an error response for some reason.");
            log.error("Error Message:    " + ase.getMessage());
            log.error("HTTP Status Code: " + ase.getStatusCode());
            log.error("AWS Error Code:   " + ase.getErrorCode());
            log.error("Error Type:       " + ase.getErrorType());
            log.error("Request ID:       " + ase.getRequestId());
        } catch (AmazonClientException ace) {
			log.error("ERROR en try catch:" + ace.getMessage());
            log.error("Caught an AmazonClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with S3, "
                    + "such as not being able to access the network.");
            log.info("Error Message: " + ace.getMessage());
        }catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
            log.error("Caught an AmazonClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with S3, "
                    + "such as not being able to access the network.");
            log.error("Error Message: " + e.getMessage());
        }
        return s3.getUrl(bucketName, key).toString();
    }
    public String insertarFicheroS3jpg(BufferedImage f,String path,String key){
    	log.info("S3AndBbdd insertarFicheroS3jpg");
    	
        try {
        	if(credentials==null){
        		ProfilesConfigFile p= new ProfilesConfigFile(path);
                credentials = new ProfileCredentialsProvider(p,"default").getCredentials();
        	}
        	
        } catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
            throw new AmazonClientException(
                    "Cannot load the credentials from the credential profiles file. " +
                    "Please make sure that your credentials file is at the correct " +
                    "location (C:\\Users\\Sarandon\\.aws\\credentials), and is in valid format.",
                    e);
        }
       // String bucketName = "decotheco-thecoradores";

        
        AmazonS3 s3 = new AmazonS3Client(credentials);
        Region usWest2 = Region.getRegion(Regions.EU_WEST_1);
        s3.setRegion(usWest2);
        

        log.info("===========================================");
        log.info("Getting Inserting Buffer with Amazon S3");
        log.info("===========================================\n");

        try {
            
        	ByteArrayOutputStream os = new ByteArrayOutputStream();
    		ImageIO.write(f, "jpg", os);
    		byte[] buffer = os.toByteArray();
    		InputStream is = new ByteArrayInputStream(buffer);
    		
    		
    		
    		ObjectMetadata meta = new ObjectMetadata();
    		meta.setContentLength(buffer.length);
    		s3.putObject(new PutObjectRequest(bucketName,  key, is, meta).withCannedAcl(CannedAccessControlList.PublicRead));
    

            
            
        } catch (AmazonServiceException ase) {
			log.error("ERROR en try catch:" + ase.getMessage());
            log.error("Caught an AmazonServiceException, which means your request made it "
                    + "to Amazon S3, but was rejected with an error response for some reason.");
            log.error("Error Message:    " + ase.getMessage());
            log.error("HTTP Status Code: " + ase.getStatusCode());
            log.error("AWS Error Code:   " + ase.getErrorCode());
            log.error("Error Type:       " + ase.getErrorType());
            log.error("Request ID:       " + ase.getRequestId());
        } catch (AmazonClientException ace) {
			log.error("ERROR en try catch:" + ace.getMessage());
            log.error("Caught an AmazonClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with S3, "
                    + "such as not being able to access the network.");
            log.error("Error Message: " + ace.getMessage());
        }catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
            log.error("Caught an AmazonClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with S3, "
                    + "such as not being able to access the network.");
            log.error("Error Message: " + e.getMessage());
        }
        return s3.getUrl(bucketName, key).toString();
    }

    public String insertarFicheroS3(File f,String path,String key){
    	log.info("S3AndBbdd insertarFicheroS3");
    	
        try {
        	if(credentials==null){
        		ProfilesConfigFile p= new ProfilesConfigFile(path);
                credentials = new ProfileCredentialsProvider(p,"default").getCredentials();
        	}
        	
        } catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
            throw new AmazonClientException(
                    "Cannot load the credentials from the credential profiles file. " +
                    "Please make sure that your credentials file is at the correct " +
                    "location (C:\\Users\\Sarandon\\.aws\\credentials), and is in valid format.",
                    e);
        }
       // String bucketName = "decotheco-thecoradores";

        AmazonS3 s3 = new AmazonS3Client(credentials);
        Region usWest2 = Region.getRegion(Regions.EU_WEST_1);
        s3.setRegion(usWest2);
//NOMBRE DEL BUCKET
        //String bucketName = "decotheco-thecoradores";
// KEY del fichero que subiremos, se le pueden poner rutas con / que se comportan 100% como carpetas
       // String key = "nuevaimagen"+new Date().getTime();

        log.info("===========================================");
        log.info("Getting Inserting File with Amazon S3");
        log.info("===========================================\n");

        try {
            
            log.info("Uploading a new object to S3 from a file\n");
            //aqui usamos pasamos la url que queremos subir al metodo getSampleFile que devuelve un File con el contenido de la URL
            s3.putObject(
            		new PutObjectRequest(
            				bucketName, 
            				key, 
            				f).withCannedAcl(CannedAccessControlList.PublicRead));
            
            //ESTA ES LA URL nueva del bucket que usaremos ahora en la app
            
            
        } catch (AmazonServiceException ase) {
			log.error("ERROR en try catch:" + ase.getMessage());
            log.error("Caught an AmazonServiceException, which means your request made it "
                    + "to Amazon S3, but was rejected with an error response for some reason.");
            log.error("Error Message:    " + ase.getMessage());
            log.error("HTTP Status Code: " + ase.getStatusCode());
            log.error("AWS Error Code:   " + ase.getErrorCode());
            log.error("Error Type:       " + ase.getErrorType());
            log.error("Request ID:       " + ase.getRequestId());
        } catch (AmazonClientException ace) {
			log.error("ERROR en try catch:" + ace.getMessage());
            log.error("Caught an AmazonClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with S3, "
                    + "such as not being able to access the network.");
            log.error("Error Message: " + ace.getMessage());
        }
        return s3.getUrl(bucketName, key).toString();
    }
    
}
