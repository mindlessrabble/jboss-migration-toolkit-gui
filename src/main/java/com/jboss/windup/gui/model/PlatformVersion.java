package com.jboss.windup.gui.model;

import javax.persistence.Entity;
import java.io.Serializable;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Version;
import java.lang.Override;
import com.jboss.windup.gui.model.Platform;
import javax.persistence.ManyToOne;

@Entity
@Table(name = "PlatVersion")
public class PlatformVersion implements Serializable
{

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name = "id", updatable = false, nullable = false)
   private Long id;
   @Version
   @Column(name = "version")
   private int version;

   @Column(length = 10, nullable = false)
   private String platVersion;

   @ManyToOne
   private Platform platform;

   public Long getId()
   {
      return this.id;
   }

   public void setId(final Long id)
   {
      this.id = id;
   }

   public int getVersion()
   {
      return this.version;
   }

   public void setVersion(final int version)
   {
      this.version = version;
   }

   @Override
   public boolean equals(Object obj)
   {
      if (this == obj)
      {
         return true;
      }
      if (!(obj instanceof PlatformVersion))
      {
         return false;
      }
      PlatformVersion other = (PlatformVersion) obj;
      if (id != null)
      {
         if (!id.equals(other.id))
         {
            return false;
         }
      }
      return true;
   }

   @Override
   public int hashCode()
   {
      final int prime = 31;
      int result = 1;
      result = prime * result + ((id == null) ? 0 : id.hashCode());
      return result;
   }

   public String getPlatVersion()
   {
      return platVersion;
   }

   public void setPlatVersion(String platVersion)
   {
      this.platVersion = platVersion;
   }

   @Override
   public String toString()
   {
      String result = getClass().getSimpleName() + " ";
      if (platVersion != null && !platVersion.trim().isEmpty())
         result += "platVersion: " + platVersion;
      return result;
   }

   public Platform getPlatform()
   {
      return this.platform;
   }

   public void setPlatform(final Platform platform)
   {
      this.platform = platform;
   }
}