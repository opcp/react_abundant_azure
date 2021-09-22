using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace react_abundant_azure.Models
{
    public partial class AbundantContext : DbContext
    {
        public AbundantContext()
        {
        }

        public AbundantContext(DbContextOptions<AbundantContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Member> Members { get; set; }
        public virtual DbSet<MemberOrder> MemberOrders { get; set; }
        public virtual DbSet<MemberOrderDetail> MemberOrderDetails { get; set; }
        public virtual DbSet<Room> Rooms { get; set; }
        public virtual DbSet<RoomCouldOrderDate> RoomCouldOrderDates { get; set; }
        public virtual DbSet<RoomType> RoomTypes { get; set; }
        public virtual DbSet<VerifyMail> VerifyMails { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=tcp:abundant.database.windows.net,1433;Initial Catalog=Abundant;Persist Security Info=False;User ID=AbundantAdmin;Password=~Qwer1234;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Member>(entity =>
            {
                entity.ToTable("Member");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Address).HasMaxLength(100);

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasColumnName("Create_Date");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Enable)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.FacebookId)
                    .IsUnicode(false)
                    .HasColumnName("Facebook_ID");

                entity.Property(e => e.LineId)
                    .IsUnicode(false)
                    .HasColumnName("Line_ID");

                entity.Property(e => e.ModifyDate)
                    .HasColumnType("datetime")
                    .HasColumnName("Modify_Date");

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.PasswordHashed)
                    .IsRequired()
                    .HasColumnName("Password_Hashed");

                entity.Property(e => e.PasswordSalt)
                    .IsRequired()
                    .HasColumnName("Password_Salt");

                entity.Property(e => e.Phone)
                    .HasMaxLength(15)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<MemberOrder>(entity =>
            {
                entity.HasKey(e => e.OrderId)
                    .HasName("PK__MemberOr__C3905BAFAD8F1C61");

                entity.ToTable("MemberOrder");

                entity.Property(e => e.OrderId)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("OrderID");

                entity.Property(e => e.CheckInDate).HasColumnType("date");

                entity.Property(e => e.CheckOutDate).HasColumnType("date");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.MemberId).HasColumnName("MemberID");

                entity.Property(e => e.ModiftDate).HasColumnType("datetime");

                entity.Property(e => e.OrderCancel)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.HasOne(d => d.Member)
                    .WithMany(p => p.MemberOrders)
                    .HasForeignKey(d => d.MemberId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MemberID");
            });

            modelBuilder.Entity<MemberOrderDetail>(entity =>
            {
                entity.HasKey(e => e.DetailId)
                    .HasName("PK__MemberOr__135C316D3276772D");

                entity.ToTable("MemberOrderDetail");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.ModiftDate).HasColumnType("datetime");

                entity.Property(e => e.OrderDate).HasColumnType("date");

                entity.Property(e => e.OrderId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("OrderID");
            });

            modelBuilder.Entity<Room>(entity =>
            {
                entity.HasKey(e => new { e.RoomDate, e.RoomType })
                    .HasName("PK__Room__8DB1429F35B68318");

                entity.ToTable("Room");

                entity.Property(e => e.RoomDate).HasColumnType("date");

                entity.Property(e => e.ModiftDate).HasColumnType("datetime");

                entity.HasOne(d => d.RoomTypeNavigation)
                    .WithMany(p => p.Rooms)
                    .HasForeignKey(d => d.RoomType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RoomType");
            });

            modelBuilder.Entity<RoomCouldOrderDate>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("RoomCouldOrderDate");

                entity.Property(e => e.LastestModify).HasColumnType("datetime");

                entity.Property(e => e.RoomDate).HasColumnType("date");
            });

            modelBuilder.Entity<RoomType>(entity =>
            {
                entity.HasKey(e => e.RoomId)
                    .HasName("PK__RoomType__32863939310C3B04");

                entity.ToTable("RoomType");

                entity.Property(e => e.RoomName).HasMaxLength(50);

                entity.Property(e => e.RoomPrice).HasColumnType("money");
            });

            modelBuilder.Entity<VerifyMail>(entity =>
            {
                entity.HasKey(e => e.ListNumber)
                    .HasName("PK__VerifyMa__9F10CBDC11C7D5E8");

                entity.ToTable("VerifyMail");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.EnableTime).HasColumnType("datetime");

                entity.Property(e => e.VerifyString)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Member)
                    .WithMany(p => p.VerifyMails)
                    .HasForeignKey(d => d.MemberId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_VerifyMemberId");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
