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
import java.util.Date;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import com.jboss.windup.gui.model.Category;
import javax.persistence.ManyToOne;
import com.jboss.windup.gui.model.Customer;
import com.jboss.windup.gui.model.Platform;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.persistence.Cacheable;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "PROJECT")
@Cacheable
@XmlRootElement
public class Project implements Serializable
{

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name = "id", updatable = false, nullable = false)
   private Long id;
   @Version
   @Column(name = "version")
   private int version;

   @Column(length = 30, nullable = false)
   @NotNull
   @Size(min = 1, max = 30)
   private String name;

   @Column(length = 3000, nullable = false)
   @NotNull
   @Size(max = 3000)
   private String description;

   @Column(name = "start_date")
   @Temporal(TemporalType.DATE)
   private Date startDate;

   @ManyToOne
   private Category category;

   @ManyToOne
   private Customer customer;

   @ManyToOne
   private Platform currentPlatform;

   @ManyToOne
   private Platform targetPlatform;

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
      if (!(obj instanceof Project))
      {
         return false;
      }
      Project other = (Project) obj;
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

   public String getName()
   {
      return name;
   }

   public void setName(String name)
   {
      this.name = name;
   }

   public String getDescription()
   {
      return description;
   }

   public void setDescription(String description)
   {
      this.description = description;
   }

   public Date getStartDate()
   {
      return startDate;
   }

   public void setStartDate(Date startDate)
   {
      this.startDate = startDate;
   }

   @Override
   public String toString()
   {
      String result = getClass().getSimpleName() + " ";
      if (name != null && !name.trim().isEmpty())
         result += "name: " + name;
      if (description != null && !description.trim().isEmpty())
         result += ", description: " + description;
      return result;
   }

   public Category getCategory()
   {
      return this.category;
   }

   public void setCategory(final Category category)
   {
      this.category = category;
   }

   public Customer getCustomer()
   {
      return this.customer;
   }

   public void setCustomer(final Customer customer)
   {
      this.customer = customer;
   }

   public Platform getCurrentPlatform()
   {
      return this.currentPlatform;
   }

   public void setCurrentPlatform(final Platform currentPlatform)
   {
      this.currentPlatform = currentPlatform;
   }

   public Platform getTargetPlatform()
   {
      return this.targetPlatform;
   }

   public void setTargetPlatform(final Platform targetPlatform)
   {
      this.targetPlatform = targetPlatform;
   }
}