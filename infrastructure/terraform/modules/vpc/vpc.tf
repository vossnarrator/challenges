resource "aws_vpc" "default" {
  cidr_block = "${var.vpc_cidr_block}"
}

resource "aws_internet_gateway" "default" {
  vpc_id = "${aws_vpc.default.id}"
}

resource "aws_route" "internet_access" {
  route_table_id         = "${aws_vpc.default.main_route_table_id}"
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = "${aws_internet_gateway.default.id}"
}

resource "aws_subnet" "public_subnet" {
  vpc_id                  = "${aws_vpc.default.id}"
  cidr_block              = "${var.public_subnet}"
  map_public_ip_on_launch = true
}

resource "aws_default_security_group" "default_security_group" {
  vpc_id      = "${aws_vpc.default.id}"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
