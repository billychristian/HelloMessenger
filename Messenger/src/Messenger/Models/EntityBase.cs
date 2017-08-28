using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Messenger.Models
{
    public class EntityBase
    {
        [Key]
        public Guid Id { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
