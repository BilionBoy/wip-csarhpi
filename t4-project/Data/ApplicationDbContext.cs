using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using t4_project.Models;

namespace t4_project.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Categoria> Categorias { get; set; }
    }
}
