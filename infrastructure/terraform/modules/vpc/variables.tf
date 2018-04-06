variable "vpc_cidr_block" {
  description = "VPC CIDR block"
  default     = "10.0.0.0/16"
}

variable "public_subnet" {
  description = "CIDR block assigned to public subnet"
  default = "10.0.1.0/24"
}
